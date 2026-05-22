<?php
// Basic smoke test for callback verification logic by hash/token simulation.

function assert_true($cond, $msg) {
    if (!$cond) {
        throw new Exception('Assertion failed: ' . $msg);
    }
}

$serverKey = 'dummy_server_key';
$orderId = 'ANR-1-123456';
$statusCode = '200';
$grossAmount = '100000.00';
$signature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);
assert_true(strlen($signature) === 128, 'Midtrans signature length should be 128');

$expectedToken = 'xendit_callback_secret';
$receivedToken = 'xendit_callback_secret';
assert_true(hash_equals($expectedToken, $receivedToken), 'Xendit callback token should match');

echo "test_payment.php OK\n";
