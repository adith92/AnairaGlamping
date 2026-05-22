<?php
class XenditPaymentValidationModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $token = Tools::getValue('x-callback-token', null);
        if (!$token && isset($_SERVER['HTTP_X_CALLBACK_TOKEN'])) { $token = $_SERVER['HTTP_X_CALLBACK_TOKEN']; }
        if (!hash_equals((string)Configuration::get('XENDIT_CALLBACK_TOKEN'), (string)$token)) {
            header('HTTP/1.1 401 Unauthorized');
            exit('invalid callback token');
        }
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        if (($data['status'] ?? '') === 'PAID') {
            // TODO: map external_id to ps_orders/ps_booking and set paid state.
        }
        header('Content-Type: application/json');
        echo json_encode(array('received' => true));
        exit;
    }
}
