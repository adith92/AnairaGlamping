<?php
class AnairaMultiPaymentCancelModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        parent::initContent();
        Tools::redirect('index.php?controller=order');
    }
}
