<?php
class UnionPayAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'unionpay'; }
    public function getDisplayName(){ return 'UnionPay (Acquirer Channel)'; }
    public function createPayment(array $payload){ return array('provider'=>'unionpay_via_acquirer','notes'=>'Use provider/acquirer that supports UnionPay.'); }
    public function verifyWebhook(array $headers, $rawBody){ return false; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'unknown'); }
    public function mapStatus($providerStatus){ return 'unknown'; }
}
