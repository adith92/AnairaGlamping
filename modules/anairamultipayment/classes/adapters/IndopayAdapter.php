<?php
class IndopayAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'indopay'; }
    public function getDisplayName(){ return 'Indopay / Custom Acquirer'; }
    public function createPayment(array $payload){ return array('requires_official_docs'=>true,'provider'=>'indopay'); }
    public function verifyWebhook(array $headers, $rawBody){ return false; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'unknown','requires_official_docs'=>true); }
    public function mapStatus($providerStatus){ return 'unknown'; }
}
