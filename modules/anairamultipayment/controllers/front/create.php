<?php
class AnairaMultiPaymentCreateModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        $msg = rawurlencode('Saya ingin booking Anaira Glamping');
        Tools::redirect('https://wa.me/6281399693499?text='.$msg);
    }
}
