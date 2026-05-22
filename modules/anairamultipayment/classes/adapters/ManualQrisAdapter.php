<?php
class ManualQrisAdapter implements GatewayAdapterInterface
{
    public function getCode(){ return 'manual_qris'; }
    public function getDisplayName(){ return 'Manual QRIS'; }
    public function createPayment(array $payload){ return array('type'=>'manual_qris','instructions'=>Configuration::get('ANAIRA_QRIS_INSTRUCTION_TEXT')); }
    public function verifyWebhook(array $headers, $rawBody){ return false; }
    public function parseWebhook(array $headers, $rawBody){ return array('status'=>'pending'); }
    public function mapStatus($providerStatus){ return 'pending'; }
}
