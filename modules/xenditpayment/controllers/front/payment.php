<?php
class XenditPaymentPaymentModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $cart = $this->context->cart;
        if (!$cart || !$cart->id) { Tools::redirect('index.php?controller=order'); }

        $apiKey = (string)Configuration::get('XENDIT_API_KEY');
        $amount = (float)$cart->getOrderTotal(true, Cart::BOTH);
        $merchantReference = 'ANR-XEN-' . (int)$cart->id . '-' . time();
        $payload = array(
            'external_id' => $merchantReference,
            'payer_email' => $this->context->customer->email,
            'amount' => (int)round($amount),
            'invoice_duration' => 86400,
            'success_redirect_url' => $this->context->link->getPageLink('order-confirmation', true),
            'failure_redirect_url' => $this->context->link->getPageLink('order', true),
        );

        Db::getInstance()->insert('anaira_payment_log', array(
            'id_cart' => (int)$cart->id,
            'gateway' => 'xendit',
            'merchant_reference' => pSQL($merchantReference),
            'amount' => (float)$amount,
            'currency' => 'IDR',
            'status' => 'pending',
            'request_hash' => pSQL(hash('sha256', json_encode($payload))),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ), false, true, Db::REPLACE);

        $ch = curl_init('https://api.xendit.co/v2/invoices');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, $apiKey . ':');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $response = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $res = json_decode((string)$response, true);
        if ($httpCode < 400 && !empty($res['invoice_url'])) {
            Tools::redirect($res['invoice_url']);
            return;
        }

        PrestaShopLogger::addLog('[Xendit] Failed to create invoice for ref '.$merchantReference, 2);
        $this->context->smarty->assign(array('message' => 'Pembayaran belum dapat diproses. Silakan coba lagi atau gunakan WhatsApp.'));
        $this->setTemplate('module:xenditpayment/views/templates/front/redirect.tpl');
    }
}
