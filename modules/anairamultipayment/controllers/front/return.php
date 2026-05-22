<?php
class AnairaMultiPaymentReturnModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        parent::initContent();
        $this->context->smarty->assign(array('message'=>'Payment return received.'));
        $this->setTemplate('module:anairamultipayment/views/templates/front/redirect.tpl');
    }
}
