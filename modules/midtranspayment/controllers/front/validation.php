<?php
class MidtransPaymentValidationModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $json = file_get_contents('php://input');
        $data = json_decode((string)$json, true);
        $serverKey = (string)Configuration::get('MIDTRANS_SERVER_KEY');

        $sig = isset($data['signature_key']) ? (string)$data['signature_key'] : '';
        $orderId = isset($data['order_id']) ? (string)$data['order_id'] : '';
        $statusCode = isset($data['status_code']) ? (string)$data['status_code'] : '';
        $grossAmount = isset($data['gross_amount']) ? (string)$data['gross_amount'] : '';
        $calc = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);
        if (!$sig || !hash_equals($calc, $sig)) {
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(array('error' => 'invalid signature'));
            exit;
        }

        $row = Db::getInstance()->getRow('SELECT * FROM `'._DB_PREFIX_.'anaira_payment_log` WHERE merchant_reference = "'.pSQL($orderId).'" LIMIT 1');
        if (!$row) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode(array('error' => 'reference not found'));
            exit;
        }

        if ((float)$row['amount'] !== (float)$grossAmount) {
            header('HTTP/1.1 422 Unprocessable Entity');
            echo json_encode(array('error' => 'amount mismatch'));
            exit;
        }

        $eventHash = hash('sha256', 'midtrans|'.$orderId.'|'.($data['transaction_id'] ?? '').'|'.($data['transaction_status'] ?? ''));
        if (!empty($row['last_event_hash']) && hash_equals((string)$row['last_event_hash'], $eventHash)) {
            echo json_encode(array('received' => true, 'idempotent' => true));
            exit;
        }

        $statusMap = array('capture' => 'paid', 'settlement' => 'paid', 'pending' => 'pending', 'expire' => 'expired', 'cancel' => 'cancelled', 'deny' => 'failed');
        $normalized = isset($statusMap[$data['transaction_status'] ?? '']) ? $statusMap[$data['transaction_status']] : 'unknown';

        Db::getInstance()->update('anaira_payment_log', array(
            'provider_transaction_id' => pSQL((string)($data['transaction_id'] ?? '')),
            'status' => pSQL($normalized),
            'last_event_hash' => pSQL($eventHash),
            'safe_message' => pSQL('midtrans webhook processed'),
            'updated_at' => date('Y-m-d H:i:s')
        ), 'merchant_reference = "'.pSQL($orderId).'"');

        echo json_encode(array('received' => true, 'status' => $normalized));
        exit;
    }
}
