<?php
class MidtransPaymentPaymentModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $cart = $this->context->cart;
        if (!$cart || !$cart->id) { Tools::redirect('index.php?controller=order'); }

        $amount = (float)$cart->getOrderTotal(true, Cart::BOTH);
        $merchantReference = 'ANR-MID-' . (int)$cart->id . '-' . time();
        $payload = array(
            'transaction_details' => array('order_id' => $merchantReference, 'gross_amount' => (int)round($amount)),
            'enabled_payments' => array('qris', 'bank_transfer', 'gopay', 'credit_card')
        );

        Db::getInstance()->insert('anaira_payment_log', array(
            'id_cart' => (int)$cart->id,
            'gateway' => 'midtrans',
            'merchant_reference' => pSQL($merchantReference),
            'amount' => (float)$amount,
            'currency' => 'IDR',
            'status' => 'pending',
            'request_hash' => pSQL(hash('sha256', json_encode($payload))),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ), false, true, Db::REPLACE);

        $endpoint = Configuration::get('MIDTRANS_ENV') === 'production' ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
        $serverKey = (string)Configuration::get('MIDTRANS_SERVER_KEY');

        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json', 'Authorization: Basic ' . base64_encode($serverKey . ':')));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $response = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $res = json_decode((string)$response, true);
        if ($httpCode >= 400 || empty($res['token'])) {
            PrestaShopLogger::addLog('[Midtrans] Failed to create transaction for ref '.$merchantReference, 2);
            $this->context->smarty->assign(array('snap_token' => null, 'client_key' => '', 'env' => Configuration::get('MIDTRANS_ENV', 'sandbox'), 'safe_error' => 'Pembayaran belum dapat diproses. Silakan coba lagi atau gunakan WhatsApp.'));
            $this->setTemplate('module:midtranspayment/views/templates/front/redirect.tpl');
            return;
        }

        $this->context->smarty->assign(array('snap_token' => $res['token'], 'client_key' => Configuration::get('MIDTRANS_CLIENT_KEY'), 'env' => Configuration::get('MIDTRANS_ENV', 'sandbox'), 'safe_error' => ''));
        $this->setTemplate('module:midtranspayment/views/templates/front/redirect.tpl');
    }
}
