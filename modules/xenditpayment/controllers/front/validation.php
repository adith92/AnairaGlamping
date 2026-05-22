<?php
class XenditPaymentValidationModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $token = '';
        if (isset($_SERVER['HTTP_X_CALLBACK_TOKEN'])) { $token = (string)$_SERVER['HTTP_X_CALLBACK_TOKEN']; }
        if (!hash_equals((string)Configuration::get('XENDIT_CALLBACK_TOKEN'), $token)) {
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(array('error' => 'invalid callback token'));
            exit;
        }

        $json = file_get_contents('php://input');
        $data = json_decode((string)$json, true);
        $externalId = (string)($data['external_id'] ?? '');
        $paidAmount = (float)($data['paid_amount'] ?? $data['amount'] ?? 0);

        $row = Db::getInstance()->getRow('SELECT * FROM `'._DB_PREFIX_.'anaira_payment_log` WHERE merchant_reference = "'.pSQL($externalId).'" LIMIT 1');
        if (!$row) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode(array('error' => 'reference not found'));
            exit;
        }

        if ((float)$row['amount'] !== (float)$paidAmount) {
            header('HTTP/1.1 422 Unprocessable Entity');
            echo json_encode(array('error' => 'amount mismatch'));
            exit;
        }

        $eventHash = hash('sha256', 'xendit|'.$externalId.'|'.($data['id'] ?? '').'|'.($data['status'] ?? ''));
        if (!empty($row['last_event_hash']) && hash_equals((string)$row['last_event_hash'], $eventHash)) {
            echo json_encode(array('received' => true, 'idempotent' => true));
            exit;
        }

        $statusMap = array('PAID'=>'paid','PENDING'=>'pending','EXPIRED'=>'expired');
        $normalized = isset($statusMap[$data['status'] ?? '']) ? $statusMap[$data['status']] : 'unknown';
        Db::getInstance()->update('anaira_payment_log', array(
            'provider_transaction_id' => pSQL((string)($data['id'] ?? '')),
            'status' => pSQL($normalized),
            'last_event_hash' => pSQL($eventHash),
            'safe_message' => pSQL('xendit webhook processed'),
            'updated_at' => date('Y-m-d H:i:s')
        ), 'merchant_reference = "'.pSQL($externalId).'"');

        echo json_encode(array('received' => true, 'status' => $normalized));
        exit;
    }
}
