<?php
interface GatewayAdapterInterface
{
    public function getCode();
    public function getDisplayName();
    public function createPayment(array $payload);
    public function verifyWebhook(array $headers, $rawBody);
    public function parseWebhook(array $headers, $rawBody);
    public function mapStatus($providerStatus);
}
