<?php
class PaymentLogger
{
    public static function log($gateway, $ref, $status, $message)
    {
        PrestaShopLogger::addLog('[AnairaPay]['.$gateway.']['.$ref.'] '.$status.' '.$message, 1, null, 'Cart', 0, true);
    }
}
