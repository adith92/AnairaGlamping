<?php
if (!defined('"'"'_PS_VERSION_'"'"')) { exit; }
class AnairaMultiPayment extends PaymentModule
{
    public function __construct()
    {
        $this->name = '"'"'anairamultipayment'"'"';
        $this->tab = '"'"'payments_gateways'"'"';
        $this->version = '"'"'1.0.0'"'"';
        $this->author = '"'"'Anaira'"'"';
        $this->controllers = array('"'"'create'"'"', '"'"'webhook'"'"', '"'"'return'"'"', '"'"'cancel'"'"');
        $this->bootstrap = true;
        parent::__construct();
        $this->displayName = $this->l('"'"'Anaira Multi Payment'"'"');
        $this->description = $this->l('"'"'Unified payment architecture with provider adapters and secure webhook handling.'"'"');
    }

    public function install()
    {
        return parent::install() && $this->registerHook('"'"'paymentOptions'"'"') && $this->registerHook('"'"'paymentReturn'"'"') && $this->installSchema() && $this->installDefaults();
    }

    public function uninstall()
    {
        $keys = array('"'"'ANAIRA_ENABLE_MIDTRANS'"'"','"'"'ANAIRA_MIDTRANS_ENVIRONMENT'"'"','"'"'ANAIRA_MIDTRANS_SERVER_KEY'"'"','"'"'ANAIRA_MIDTRANS_CLIENT_KEY'"'"','"'"'ANAIRA_ENABLE_XENDIT'"'"','"'"'ANAIRA_XENDIT_ENVIRONMENT'"'"','"'"'ANAIRA_XENDIT_SECRET_KEY'"'"','"'"'ANAIRA_XENDIT_CALLBACK_TOKEN'"'"','"'"'ANAIRA_ENABLE_DOKU'"'"','"'"'ANAIRA_DOKU_ENVIRONMENT'"'"','"'"'ANAIRA_DOKU_CLIENT_ID'"'"','"'"'ANAIRA_DOKU_SECRET_KEY'"'"','"'"'ANAIRA_DOKU_SHARED_KEY'"'"','"'"'ANAIRA_ENABLE_INDOPAY'"'"','"'"'ANAIRA_INDOPAY_ENVIRONMENT'"'"','"'"'ANAIRA_INDOPAY_MERCHANT_ID'"'"','"'"'ANAIRA_INDOPAY_API_KEY'"'"','"'"'ANAIRA_ENABLE_MANUAL_QRIS'"'"','"'"'ANAIRA_QRIS_IMAGE_PATH'"'"','"'"'ANAIRA_QRIS_INSTRUCTION_TEXT'"'"','"'"'ANAIRA_ENABLE_UNIONPAY'"'"','"'"'ANAIRA_UNIONPAY_PROVIDER'"'"','"'"'ANAIRA_UNIONPAY_NOTES'"'"','"'"'ANAIRA_WHATSAPP_NUMBER'"'"');
        foreach ($keys as $key) { Configuration::deleteByName($key); }
        return parent::uninstall();
    }

    protected function installSchema()
    {
        $sql = '"'"'CREATE TABLE IF NOT EXISTS `'"'"'._DB_PREFIX_.'"'"'anaira_payment_log` (
            `id_anaira_payment_log` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            `id_order` INT UNSIGNED NULL,
            `id_cart` INT UNSIGNED NULL,
            `gateway` VARCHAR(32) NOT NULL,
            `provider_transaction_id` VARCHAR(128) NULL,
            `merchant_reference` VARCHAR(128) NOT NULL,
            `amount` DECIMAL(20,2) NOT NULL,
            `currency` VARCHAR(8) NOT NULL DEFAULT "IDR",
            `status` VARCHAR(32) NOT NULL DEFAULT "pending",
            `request_hash` VARCHAR(128) NULL,
            `last_event_hash` VARCHAR(128) NULL,
            `safe_message` VARCHAR(255) NULL,
            `created_at` DATETIME NOT NULL,
            `updated_at` DATETIME NOT NULL,
            PRIMARY KEY (`id_anaira_payment_log`),
            UNIQUE KEY `uniq_merchant_reference` (`merchant_reference`),
            KEY `idx_gateway_transaction` (`gateway`,`provider_transaction_id`)
        ) ENGINE='"'"'._MYSQL_ENGINE_.'"'"' DEFAULT CHARSET=utf8;'"'"';
        return Db::getInstance()->execute($sql);
    }

    protected function installDefaults()
    {
        $defaults = array('"'"'ANAIRA_ENABLE_MIDTRANS'"'"'=>1,'"'"'ANAIRA_MIDTRANS_ENVIRONMENT'"'"'=>'"'"'sandbox'"'"','"'"'ANAIRA_MIDTRANS_SERVER_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_MIDTRANS_CLIENT_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_ENABLE_XENDIT'"'"'=>1,'"'"'ANAIRA_XENDIT_ENVIRONMENT'"'"'=>'"'"'sandbox'"'"','"'"'ANAIRA_XENDIT_SECRET_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_XENDIT_CALLBACK_TOKEN'"'"'=>'"'"''"'"','"'"'ANAIRA_ENABLE_DOKU'"'"'=>0,'"'"'ANAIRA_DOKU_ENVIRONMENT'"'"'=>'"'"'sandbox'"'"','"'"'ANAIRA_DOKU_CLIENT_ID'"'"'=>'"'"''"'"','"'"'ANAIRA_DOKU_SECRET_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_DOKU_SHARED_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_ENABLE_INDOPAY'"'"'=>0,'"'"'ANAIRA_INDOPAY_ENVIRONMENT'"'"'=>'"'"'sandbox'"'"','"'"'ANAIRA_INDOPAY_MERCHANT_ID'"'"'=>'"'"''"'"','"'"'ANAIRA_INDOPAY_API_KEY'"'"'=>'"'"''"'"','"'"'ANAIRA_ENABLE_MANUAL_QRIS'"'"'=>1,'"'"'ANAIRA_QRIS_IMAGE_PATH'"'"'=>'"'"'/img/qris-anaira.png'"'"','"'"'ANAIRA_QRIS_INSTRUCTION_TEXT'"'"'=>'"'"'Scan QRIS Anaira Glamping untuk menyelesaikan pembayaran.'"'"','"'"'ANAIRA_ENABLE_UNIONPAY'"'"'=>0,'"'"'ANAIRA_UNIONPAY_PROVIDER'"'"'=>'"'"'midtrans_or_xendit_acquirer'"'"','"'"'ANAIRA_UNIONPAY_NOTES'"'"'=>'"'"'UnionPay only through an enabled acquirer/provider channel.'"'"','"'"'ANAIRA_WHATSAPP_NUMBER'"'"'=>'"'"'081399693499'"'"');
        foreach ($defaults as $k => $v) { Configuration::updateValue($k, $v); }
        return true;
    }

    public function getContent()
    {
        if (Tools::isSubmit('"'"'submitAnairaMultiPayment'"'"')) {
            $keys = array('"'"'ANAIRA_ENABLE_MIDTRANS'"'"','"'"'ANAIRA_MIDTRANS_ENVIRONMENT'"'"','"'"'ANAIRA_MIDTRANS_SERVER_KEY'"'"','"'"'ANAIRA_MIDTRANS_CLIENT_KEY'"'"','"'"'ANAIRA_ENABLE_XENDIT'"'"','"'"'ANAIRA_XENDIT_ENVIRONMENT'"'"','"'"'ANAIRA_XENDIT_SECRET_KEY'"'"','"'"'ANAIRA_XENDIT_CALLBACK_TOKEN'"'"','"'"'ANAIRA_ENABLE_DOKU'"'"','"'"'ANAIRA_DOKU_ENVIRONMENT'"'"','"'"'ANAIRA_DOKU_CLIENT_ID'"'"','"'"'ANAIRA_DOKU_SECRET_KEY'"'"','"'"'ANAIRA_DOKU_SHARED_KEY'"'"','"'"'ANAIRA_ENABLE_INDOPAY'"'"','"'"'ANAIRA_INDOPAY_ENVIRONMENT'"'"','"'"'ANAIRA_INDOPAY_MERCHANT_ID'"'"','"'"'ANAIRA_INDOPAY_API_KEY'"'"','"'"'ANAIRA_ENABLE_MANUAL_QRIS'"'"','"'"'ANAIRA_QRIS_IMAGE_PATH'"'"','"'"'ANAIRA_QRIS_INSTRUCTION_TEXT'"'"','"'"'ANAIRA_ENABLE_UNIONPAY'"'"','"'"'ANAIRA_UNIONPAY_PROVIDER'"'"','"'"'ANAIRA_UNIONPAY_NOTES'"'"','"'"'ANAIRA_WHATSAPP_NUMBER'"'"');
            foreach ($keys as $k) { Configuration::updateValue($k, Tools::getValue($k)); }
            return $this->displayConfirmation($this->l('"'"'Settings saved.'"'"')) . $this->renderForm();
        }
        return $this->renderForm();
    }

    protected function renderForm()
    {
        $helper = new HelperForm();
        $helper->submit_action = '"'"'submitAnairaMultiPayment'"'"';
        $inputs = array();
        $switchKeys = array('"'"'ANAIRA_ENABLE_MIDTRANS'"'"','"'"'ANAIRA_ENABLE_XENDIT'"'"','"'"'ANAIRA_ENABLE_DOKU'"'"','"'"'ANAIRA_ENABLE_INDOPAY'"'"','"'"'ANAIRA_ENABLE_MANUAL_QRIS'"'"','"'"'ANAIRA_ENABLE_UNIONPAY'"'"');
        foreach ($switchKeys as $k) { $inputs[] = array('"'"'type'"'"'=>'"'"'switch'"'"','"'"'label'"'"'=>$k,'"'"'name'"'"'=>$k,'"'"'is_bool'"'"'=>true,'"'"'values'"'"'=>array(array('"'"'id'"'"'=>'"'"'on'"'"','"'"'value'"'"'=>1,'"'"'label'"'"'=>$this->l('"'"'Enabled'"'"')),array('"'"'id'"'"'=>'"'"'off'"'"','"'"'value'"'"'=>0,'"'"'label'"'"'=>$this->l('"'"'Disabled'"'"')))); }
        $envs = array('"'"'ANAIRA_MIDTRANS_ENVIRONMENT'"'"','"'"'ANAIRA_XENDIT_ENVIRONMENT'"'"','"'"'ANAIRA_DOKU_ENVIRONMENT'"'"','"'"'ANAIRA_INDOPAY_ENVIRONMENT'"'"');
        foreach ($envs as $k) { $inputs[] = array('"'"'type'"'"'=>'"'"'select'"'"','"'"'label'"'"'=>$k,'"'"'name'"'"'=>$k,'"'"'options'"'"'=>array('"'"'query'"'"'=>array(array('"'"'id'"'"'=>'"'"'sandbox'"'"','"'"'name'"'"'=>'"'"'Sandbox'"'"'),array('"'"'id'"'"'=>'"'"'production'"'"','"'"'name'"'"'=>'"'"'Production'"'"')),'"'"'id'"'"'=>'"'"'id'"'"','"'"'name'"'"'=>'"'"'name'"'"')); }
        $textKeys = array('"'"'ANAIRA_MIDTRANS_SERVER_KEY'"'"','"'"'ANAIRA_MIDTRANS_CLIENT_KEY'"'"','"'"'ANAIRA_XENDIT_SECRET_KEY'"'"','"'"'ANAIRA_XENDIT_CALLBACK_TOKEN'"'"','"'"'ANAIRA_DOKU_CLIENT_ID'"'"','"'"'ANAIRA_DOKU_SECRET_KEY'"'"','"'"'ANAIRA_DOKU_SHARED_KEY'"'"','"'"'ANAIRA_INDOPAY_MERCHANT_ID'"'"','"'"'ANAIRA_INDOPAY_API_KEY'"'"','"'"'ANAIRA_QRIS_IMAGE_PATH'"'"','"'"'ANAIRA_QRIS_INSTRUCTION_TEXT'"'"','"'"'ANAIRA_UNIONPAY_PROVIDER'"'"','"'"'ANAIRA_UNIONPAY_NOTES'"'"','"'"'ANAIRA_WHATSAPP_NUMBER'"'"');
        foreach ($textKeys as $k) { $inputs[] = array('"'"'type'"'"'=>'"'"'text'"'"','"'"'label'"'"'=>$k,'"'"'name'"'"'=>$k); }
        $helper->fields_form = array(array('"'"'form'"'"'=>array('"'"'legend'"'"'=>array('"'"'title'"'"'=>$this->l('"'"'Anaira Multi Gateway Config'"'"')),'"'"'input'"'"'=>$inputs,'"'"'submit'"'"'=>array('"'"'title'"'"'=>$this->l('"'"'Save'"'"')))));
        $values = array();
        foreach (array_merge($switchKeys,$envs,$textKeys) as $k) { $values[$k] = Configuration::get($k); }
        $helper->fields_value = $values;
        return $helper->generateForm($helper->fields_form);
    }

    public function hookPaymentOptions($params)
    {
        if (!$this->active) { return; }
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('"'"'Pay via Anaira Multi Payment'"'"'));
        $option->setAction($this->context->link->getModuleLink($this->name, '"'"'create'"'"', array(), true));
        $option->setAdditionalInformation($this->fetch('"'"'module:anairamultipayment/views/templates/hook/payment_options.tpl'"'"'));
        return array($option);
    }
}
