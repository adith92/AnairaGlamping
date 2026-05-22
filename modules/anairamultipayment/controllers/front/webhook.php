<?php
class AnairaMultiPaymentWebhookModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        header('Content-Type: application/json');
        echo json_encode(array('ok'=>true,'message'=>'Webhook endpoint ready.'));
        exit;
    }
}
