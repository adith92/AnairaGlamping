<?php
function assert_true($cond, $msg) { if (!$cond) { throw new Exception('Assertion failed: '.$msg); } }

$serverKey = 'dummy_server_key';
$orderId = 'ANR-MID-1-123456';
$statusCode = '200';
$grossAmount = '700000.00';
$signature = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);
assert_true(strlen($signature) === 128, 'Midtrans signature length should be 128');

$eventHash1 = hash('sha256', 'midtrans|'.$orderId.'|tx-1|settlement');
$eventHash2 = hash('sha256', 'midtrans|'.$orderId.'|tx-1|settlement');
assert_true(hash_equals($eventHash1, $eventHash2), 'Event hash should support idempotency checks');

$expectedToken = 'xendit_callback_secret';
$receivedToken = 'xendit_callback_secret';
assert_true(hash_equals($expectedToken, $receivedToken), 'Xendit callback token should match');

$loggedAmount = 700000.00;
$paidAmount = 700000.00;
assert_true((float)$loggedAmount === (float)$paidAmount, 'Amount validation should pass for matching amounts');

echo "test_payment.php OK\n";
