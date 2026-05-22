<?php
class MidtransAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'midtrans'; }
    public function getDisplayName(){ return 'Midtrans'; }
    public function createPayment(array $payload){ return array('type'=>'redirect','provider'=>'midtrans','payload'=>$payload); }
    public function verifyWebhook(array $headers, $rawBody){ return true; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'unknown'); }
    public function mapStatus($providerStatus){ $map=array('settlement'=>'paid','capture'=>'paid','pending'=>'pending','expire'=>'expired','cancel'=>'cancelled','deny'=>'failed'); return isset($map[$providerStatus]) ? $map[$providerStatus] : 'unknown'; }
}
