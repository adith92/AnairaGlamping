<?php
require_once dirname(__FILE__).'/GatewayAdapterInterface.php';
class GatewayFactory
{
    public static function create($code)
    {
        $map = array('midtrans'=>'MidtransAdapter','xendit'=>'XenditAdapter','doku'=>'DokuAdapter','indopay'=>'IndopayAdapter','manual_qris'=>'ManualQrisAdapter','unionpay'=>'UnionPayAdapter');
        $code = strtolower((string) $code);
        if (!isset($map[$code])) { throw new Exception('Unsupported gateway'); }
        $class = $map[$code];
        require_once dirname(__FILE__).'/adapters/'.$class.'.php';
        return new $class();
    }
}
