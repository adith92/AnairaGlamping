<?php
if (!defined('_PS_VERSION_')) { exit; }
class XenditPayment extends PaymentModule
{
    public function __construct()
    {
        $this->name = 'xenditpayment';
        $this->tab = 'payments_gateways';
        $this->version = '1.0.0';
        $this->author = 'Anaira';
        $this->controllers = array('payment', 'validation');
        $this->bootstrap = true;
        parent::__construct();
        $this->displayName = $this->l('Xendit Payment');
        $this->description = $this->l('Pay with Xendit Invoice');
        $this->ps_versions_compliancy = array('min' => '1.7.0.0', 'max' => _PS_VERSION_);
    }
    public function install() { return parent::install() && $this->registerHook('paymentOptions') && $this->registerHook('paymentReturn'); }
    public function getContent()
    {
        if (Tools::isSubmit('submitXenditPayment')) {
            Configuration::updateValue('XENDIT_API_KEY', Tools::getValue('XENDIT_API_KEY'));
            Configuration::updateValue('XENDIT_CALLBACK_TOKEN', Tools::getValue('XENDIT_CALLBACK_TOKEN'));
            Configuration::updateValue('XENDIT_ENV', Tools::getValue('XENDIT_ENV'));
            return $this->displayConfirmation($this->l('Settings updated')) . $this->renderForm();
        }
        return $this->renderForm();
    }
    protected function renderForm()
    {
        $helper = new HelperForm();
        $helper->submit_action = 'submitXenditPayment';
        $helper->fields_value = array('XENDIT_API_KEY'=>Configuration::get('XENDIT_API_KEY'),'XENDIT_CALLBACK_TOKEN'=>Configuration::get('XENDIT_CALLBACK_TOKEN'),'XENDIT_ENV'=>Configuration::get('XENDIT_ENV','sandbox'));
        $helper->fields_form = array(array('form'=>array('legend'=>array('title'=>$this->l('Xendit Config')),'input'=>array(
            array('type'=>'text','label'=>$this->l('API Key'),'name'=>'XENDIT_API_KEY','required'=>true),
            array('type'=>'text','label'=>$this->l('Callback Token'),'name'=>'XENDIT_CALLBACK_TOKEN','required'=>true),
            array('type'=>'select','label'=>$this->l('Environment'),'name'=>'XENDIT_ENV','options'=>array('query'=>array(array('id'=>'sandbox','name'=>'Sandbox'),array('id'=>'production','name'=>'Production')),'id'=>'id','name'=>'name')),
        ),'submit'=>array('title'=>$this->l('Save')))));
        return $helper->generateForm($helper->fields_form);
    }
    public function hookPaymentOptions($params)
    {
        if (!$this->active) { return; }
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('Bayar dengan Xendit'));
        $option->setAction($this->context->link->getModuleLink($this->name, 'payment', array(), true));
        $option->setAdditionalInformation($this->fetch('module:xenditpayment/views/templates/hook/payment_options.tpl'));
        return array($option);
    }
    public function hookPaymentReturn($params) { return $this->display(__FILE__, 'views/templates/hook/payment_options.tpl'); }
}
