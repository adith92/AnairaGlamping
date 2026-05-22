<?php
class MidtransPaymentValidationModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $serverKey = Configuration::get('MIDTRANS_SERVER_KEY');
        $sig = isset($data['signature_key']) ? $data['signature_key'] : '';
        $raw = ($data['order_id'] ?? '') . ($data['status_code'] ?? '') . ($data['gross_amount'] ?? '') . $serverKey;
        $calc = hash('sha512', $raw);
        if (!$sig || !hash_equals($calc, $sig)) {
            header('HTTP/1.1 401 Unauthorized');
            exit('invalid signature');
        }
        if (in_array($data['transaction_status'] ?? '', array('capture', 'settlement'), true)) {
            // TODO: map order_id to id_order and set paid on ps_orders/booking tables.
        }
        header('Content-Type: application/json');
        echo json_encode(array('received' => true));
        exit;
    }
}
