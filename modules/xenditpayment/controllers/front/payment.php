<?php
class XenditPaymentPaymentModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $cart = $this->context->cart;
        $apiKey = Configuration::get('XENDIT_API_KEY');
        $amount = (int)round($cart->getOrderTotal(true, Cart::BOTH));
        $payload = array(
            'external_id' => 'ANR-' . $cart->id . '-' . time(),
            'payer_email' => $this->context->customer->email,
            'amount' => $amount,
            'invoice_duration' => 86400,
            'success_redirect_url' => $this->context->link->getPageLink('order-confirmation', true),
            'failure_redirect_url' => $this->context->link->getPageLink('order', true),
        );
        $ch = curl_init('https://api.xendit.co/v2/invoices');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, $apiKey . ':');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $response = curl_exec($ch);
        curl_close($ch);
        $res = json_decode((string)$response, true);
        if (!empty($res['invoice_url'])) {
            Tools::redirect($res['invoice_url']);
        }
        $this->context->smarty->assign(array('message' => 'Invoice creation failed.'));
        $this->setTemplate('module:xenditpayment/views/templates/front/redirect.tpl');
    }
}
