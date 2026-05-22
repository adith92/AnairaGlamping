<?php
if (!defined('_PS_VERSION_')) { exit; }
class MidtransPayment extends PaymentModule
{
    public function __construct()
    {
        $this->name = 'midtranspayment';
        $this->tab = 'payments_gateways';
        $this->version = '1.0.0';
        $this->author = 'Anaira';
        $this->controllers = array('payment', 'validation');
        $this->bootstrap = true;
        parent::__construct();
        $this->displayName = $this->l('Midtrans Payment');
        $this->description = $this->l('Pay with Midtrans Snap / QRIS');
        $this->ps_versions_compliancy = array('min' => '1.7.0.0', 'max' => _PS_VERSION_);
    }
    public function install()
    {
        return parent::install() && $this->registerHook('paymentOptions') && $this->registerHook('paymentReturn');
    }
    public function uninstall()
    {
        Configuration::deleteByName('MIDTRANS_SERVER_KEY');
        Configuration::deleteByName('MIDTRANS_CLIENT_KEY');
        Configuration::deleteByName('MIDTRANS_ENV');
        return parent::uninstall();
    }
    public function getContent()
    {
        if (Tools::isSubmit('submitMidtransPayment')) {
            Configuration::updateValue('MIDTRANS_SERVER_KEY', Tools::getValue('MIDTRANS_SERVER_KEY'));
            Configuration::updateValue('MIDTRANS_CLIENT_KEY', Tools::getValue('MIDTRANS_CLIENT_KEY'));
            Configuration::updateValue('MIDTRANS_ENV', Tools::getValue('MIDTRANS_ENV'));
            return $this->displayConfirmation($this->l('Settings updated')) . $this->renderForm();
        }
        return $this->renderForm();
    }
    protected function renderForm()
    {
        $helper = new HelperForm();
        $helper->submit_action = 'submitMidtransPayment';
        $helper->fields_value = array(
            'MIDTRANS_SERVER_KEY' => Configuration::get('MIDTRANS_SERVER_KEY'),
            'MIDTRANS_CLIENT_KEY' => Configuration::get('MIDTRANS_CLIENT_KEY'),
            'MIDTRANS_ENV' => Configuration::get('MIDTRANS_ENV', 'sandbox'),
        );
        $helper->fields_form = array(array('form' => array('legend' => array('title' => $this->l('Midtrans Config')), 'input' => array(
            array('type' => 'text', 'label' => $this->l('Server Key'), 'name' => 'MIDTRANS_SERVER_KEY', 'required' => true),
            array('type' => 'text', 'label' => $this->l('Client Key'), 'name' => 'MIDTRANS_CLIENT_KEY', 'required' => true),
            array('type' => 'select', 'label' => $this->l('Environment'), 'name' => 'MIDTRANS_ENV', 'options' => array('query' => array(array('id'=>'sandbox','name'=>'Sandbox'), array('id'=>'production','name'=>'Production')), 'id' => 'id', 'name' => 'name')),
        ), 'submit' => array('title' => $this->l('Save')))));
        return $helper->generateForm($helper->fields_form);
    }
    public function hookPaymentOptions($params)
    {
        if (!$this->active) { return; }
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('Bayar dengan Midtrans / QRIS'));
        $option->setAction($this->context->link->getModuleLink($this->name, 'payment', array(), true));
        $option->setAdditionalInformation($this->fetch('module:midtranspayment/views/templates/hook/payment_options.tpl'));
        return array($option);
    }
    public function hookPaymentReturn($params) { return $this->display(__FILE__, 'views/templates/hook/payment_options.tpl'); }
}
