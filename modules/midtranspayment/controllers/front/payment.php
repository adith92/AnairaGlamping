<?php
class MidtransPaymentPaymentModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $cart = $this->context->cart;
        $amount = (int)round($cart->getOrderTotal(true, Cart::BOTH));
        $payload = array(
            'transaction_details' => array('order_id' => 'ANR-' . $cart->id . '-' . time(), 'gross_amount' => $amount),
            'credit_card' => array('secure' => true),
            'enabled_payments' => array('qris'),
        );
        $env = Configuration::get('MIDTRANS_ENV') === 'production' ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
        $serverKey = Configuration::get('MIDTRANS_SERVER_KEY');
        $ch = curl_init($env);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json', 'Authorization: Basic ' . base64_encode($serverKey . ':')));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $response = curl_exec($ch);
        curl_close($ch);
        $res = json_decode((string)$response, true);
        $this->context->smarty->assign(array('snap_token' => isset($res['token']) ? $res['token'] : null, 'client_key' => Configuration::get('MIDTRANS_CLIENT_KEY'), 'env' => Configuration::get('MIDTRANS_ENV', 'sandbox')));
        $this->setTemplate('module:midtranspayment/views/templates/front/redirect.tpl');
    }
}
