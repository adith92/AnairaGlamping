<?php
class XenditAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'xendit'; }
    public function getDisplayName(){ return 'Xendit'; }
    public function createPayment(array $payload){ return array('type'=>'redirect','provider'=>'xendit','payload'=>$payload); }
    public function verifyWebhook(array $headers, $rawBody){ return true; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'unknown'); }
    public function mapStatus($providerStatus){ $map=array('PAID'=>'paid','PENDING'=>'pending','EXPIRED'=>'expired'); return isset($map[$providerStatus]) ? $map[$providerStatus] : 'unknown'; }
}
