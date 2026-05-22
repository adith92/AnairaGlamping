<?php
class DokuAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'doku'; }
    public function getDisplayName(){ return 'DOKU'; }
    public function createPayment(array $payload){ return array('requires_official_docs'=>true,'provider'=>'doku'); }
    public function verifyWebhook(array $headers, $rawBody){ return false; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'unknown','requires_official_docs'=>true); }
    public function mapStatus($providerStatus){ return 'unknown'; }
}
