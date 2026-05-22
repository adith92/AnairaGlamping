<?php
class SignatureVerifier
{
    public static function hashEquals($a, $b) { return hash_equals((string) $a, (string) $b); }
    public static function sha512($raw) { return hash('sha512', (string) $raw); }
    public static function eventHash($gateway, $merchantReference, $providerTransactionId, $status)
    {
        return hash('sha256', implode('|', array($gateway, $merchantReference, $providerTransactionId, $status)));
    }
}
