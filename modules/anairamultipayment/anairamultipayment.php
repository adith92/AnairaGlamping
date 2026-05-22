<?php
if (!defined('_PS_VERSION_')) { exit; }

class AnairaMultiPayment extends PaymentModule
{
    public function __construct()
    {
        ->name = 'anairamultipayment';
        ->tab = 'payments_gateways';
        ->version = '1.0.1';
        ->author = 'Anaira';
        ->controllers = array('create', 'webhook', 'return', 'cancel');
        ->bootstrap = true;

        parent::__construct();

        ->displayName = ->l('Anaira Multi Payment');
        ->description = ->l('Unified payment architecture with provider adapters and secure webhook handling.');
    }

    public function install()
    {
        return parent::install()
            && ->registerHook('paymentOptions')
            && ->registerHook('paymentReturn')
            && ->installSchema()
            && ->installDefaults();
    }

    public function uninstall()
    {
         = array(
            'ANAIRA_ENABLE_MIDTRANS', 'ANAIRA_MIDTRANS_ENVIRONMENT', 'ANAIRA_MIDTRANS_SERVER_KEY', 'ANAIRA_MIDTRANS_CLIENT_KEY',
            'ANAIRA_ENABLE_XENDIT', 'ANAIRA_XENDIT_ENVIRONMENT', 'ANAIRA_XENDIT_SECRET_KEY', 'ANAIRA_XENDIT_CALLBACK_TOKEN',
            'ANAIRA_ENABLE_DOKU', 'ANAIRA_DOKU_ENVIRONMENT', 'ANAIRA_DOKU_CLIENT_ID', 'ANAIRA_DOKU_SECRET_KEY', 'ANAIRA_DOKU_SHARED_KEY',
            'ANAIRA_ENABLE_INDOPAY', 'ANAIRA_INDOPAY_ENVIRONMENT', 'ANAIRA_INDOPAY_MERCHANT_ID', 'ANAIRA_INDOPAY_API_KEY',
            'ANAIRA_ENABLE_MANUAL_QRIS', 'ANAIRA_QRIS_IMAGE_PATH', 'ANAIRA_QRIS_INSTRUCTION_TEXT',
            'ANAIRA_ENABLE_UNIONPAY', 'ANAIRA_UNIONPAY_PROVIDER', 'ANAIRA_UNIONPAY_NOTES', 'ANAIRA_WHATSAPP_NUMBER'
        );
        foreach ( as ) {
            Configuration::deleteByName();
        }
        return parent::uninstall();
    }

    protected function installSchema()
    {
         = 'CREATE TABLE IF NOT EXISTS '._DB_PREFIX_.'anaira_payment_log (
            id_anaira_payment_log INT UNSIGNED NOT NULL AUTO_INCREMENT,
            id_order INT UNSIGNED NULL,
            id_cart INT UNSIGNED NULL,
            gateway VARCHAR(32) NOT NULL,
            provider_transaction_id VARCHAR(128) NULL,
            merchant_reference VARCHAR(128) NOT NULL,
            mount DECIMAL(20,2) NOT NULL,
            currency VARCHAR(8) NOT NULL DEFAULT "IDR",
            status VARCHAR(32) NOT NULL DEFAULT "pending",
            equest_hash VARCHAR(128) NULL,
            last_event_hash VARCHAR(128) NULL,
            safe_message VARCHAR(255) NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (id_anaira_payment_log),
            UNIQUE KEY uniq_merchant_reference (merchant_reference),
            KEY idx_gateway_transaction (gateway,provider_transaction_id)
        ) ENGINE='._MYSQL_ENGINE_.' DEFAULT CHARSET=utf8;';

        return Db::getInstance()->execute();
    }

    protected function installDefaults()
    {
         = array(
            'ANAIRA_ENABLE_MIDTRANS' => 1,
            'ANAIRA_MIDTRANS_ENVIRONMENT' => 'sandbox',
            'ANAIRA_MIDTRANS_SERVER_KEY' => '',
            'ANAIRA_MIDTRANS_CLIENT_KEY' => '',
            'ANAIRA_ENABLE_XENDIT' => 1,
            'ANAIRA_XENDIT_ENVIRONMENT' => 'sandbox',
            'ANAIRA_XENDIT_SECRET_KEY' => '',
            'ANAIRA_XENDIT_CALLBACK_TOKEN' => '',
            'ANAIRA_ENABLE_DOKU' => 0,
            'ANAIRA_DOKU_ENVIRONMENT' => 'sandbox',
            'ANAIRA_DOKU_CLIENT_ID' => '',
            'ANAIRA_DOKU_SECRET_KEY' => '',
            'ANAIRA_DOKU_SHARED_KEY' => '',
            'ANAIRA_ENABLE_INDOPAY' => 0,
            'ANAIRA_INDOPAY_ENVIRONMENT' => 'sandbox',
            'ANAIRA_INDOPAY_MERCHANT_ID' => '',
            'ANAIRA_INDOPAY_API_KEY' => '',
            'ANAIRA_ENABLE_MANUAL_QRIS' => 1,
            'ANAIRA_QRIS_IMAGE_PATH' => '/img/qris-anaira.png',
            'ANAIRA_QRIS_INSTRUCTION_TEXT' => 'Scan QRIS Anaira Glamping untuk menyelesaikan pembayaran.',
            'ANAIRA_ENABLE_UNIONPAY' => 0,
            'ANAIRA_UNIONPAY_PROVIDER' => 'midtrans_or_xendit_acquirer',
            'ANAIRA_UNIONPAY_NOTES' => 'UnionPay only through an enabled acquirer/provider channel.',
            'ANAIRA_WHATSAPP_NUMBER' => '081399693499',
        );

        foreach ( as  => ) {
            Configuration::updateValue(, );
        }

        return true;
    }

    public function getContent()
    {
        if (Tools::isSubmit('submitAnairaMultiPayment')) {
             = array(
                'ANAIRA_ENABLE_MIDTRANS', 'ANAIRA_MIDTRANS_ENVIRONMENT', 'ANAIRA_MIDTRANS_SERVER_KEY', 'ANAIRA_MIDTRANS_CLIENT_KEY',
                'ANAIRA_ENABLE_XENDIT', 'ANAIRA_XENDIT_ENVIRONMENT', 'ANAIRA_XENDIT_SECRET_KEY', 'ANAIRA_XENDIT_CALLBACK_TOKEN',
                'ANAIRA_ENABLE_DOKU', 'ANAIRA_DOKU_ENVIRONMENT', 'ANAIRA_DOKU_CLIENT_ID', 'ANAIRA_DOKU_SECRET_KEY', 'ANAIRA_DOKU_SHARED_KEY',
                'ANAIRA_ENABLE_INDOPAY', 'ANAIRA_INDOPAY_ENVIRONMENT', 'ANAIRA_INDOPAY_MERCHANT_ID', 'ANAIRA_INDOPAY_API_KEY',
                'ANAIRA_ENABLE_MANUAL_QRIS', 'ANAIRA_QRIS_IMAGE_PATH', 'ANAIRA_QRIS_INSTRUCTION_TEXT',
                'ANAIRA_ENABLE_UNIONPAY', 'ANAIRA_UNIONPAY_PROVIDER', 'ANAIRA_UNIONPAY_NOTES', 'ANAIRA_WHATSAPP_NUMBER'
            );
            foreach ( as ) {
                Configuration::updateValue(, Tools::getValue());
            }
            return ->displayConfirmation(->l('Settings saved.')) . ->renderForm();
        }

        return ->renderForm();
    }

    protected function renderForm()
    {
         = new HelperForm();
        ->submit_action = 'submitAnairaMultiPayment';

         = array();
         = array('ANAIRA_ENABLE_MIDTRANS', 'ANAIRA_ENABLE_XENDIT', 'ANAIRA_ENABLE_DOKU', 'ANAIRA_ENABLE_INDOPAY', 'ANAIRA_ENABLE_MANUAL_QRIS', 'ANAIRA_ENABLE_UNIONPAY');
        foreach ( as ) {
            [] = array(
                'type' => 'switch',
                'label' => ,
                'name' => ,
                'is_bool' => true,
                'values' => array(
                    array('id' => 'on', 'value' => 1, 'label' => ->l('Enabled')),
                    array('id' => 'off', 'value' => 0, 'label' => ->l('Disabled')),
                )
            );
        }

         = array('ANAIRA_MIDTRANS_ENVIRONMENT', 'ANAIRA_XENDIT_ENVIRONMENT', 'ANAIRA_DOKU_ENVIRONMENT', 'ANAIRA_INDOPAY_ENVIRONMENT');
        foreach ( as ) {
            [] = array(
                'type' => 'select',
                'label' => ,
                'name' => ,
                'options' => array(
                    'query' => array(
                        array('id' => 'sandbox', 'name' => 'Sandbox'),
                        array('id' => 'production', 'name' => 'Production')
                    ),
                    'id' => 'id',
                    'name' => 'name'
                )
            );
        }

         = array('ANAIRA_MIDTRANS_SERVER_KEY', 'ANAIRA_MIDTRANS_CLIENT_KEY', 'ANAIRA_XENDIT_SECRET_KEY', 'ANAIRA_XENDIT_CALLBACK_TOKEN', 'ANAIRA_DOKU_CLIENT_ID', 'ANAIRA_DOKU_SECRET_KEY', 'ANAIRA_DOKU_SHARED_KEY', 'ANAIRA_INDOPAY_MERCHANT_ID', 'ANAIRA_INDOPAY_API_KEY', 'ANAIRA_QRIS_IMAGE_PATH', 'ANAIRA_QRIS_INSTRUCTION_TEXT', 'ANAIRA_UNIONPAY_PROVIDER', 'ANAIRA_UNIONPAY_NOTES', 'ANAIRA_WHATSAPP_NUMBER');
        foreach ( as ) {
            [] = array('type' => 'text', 'label' => , 'name' => );
        }

        ->fields_form = array(array(
            'form' => array(
                'legend' => array('title' => ->l('Anaira Multi Gateway Config')),
                'input' => ,
                'submit' => array('title' => ->l('Save'))
            )
        ));

         = array();
        foreach (array_merge(, , ) as ) {
            [] = Configuration::get();
        }
        ->fields_value = ;

        return ->generateForm(->fields_form);
    }

    public function hookPaymentOptions()
    {
        if (!->active) {
            return;
        }
         = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        ->setCallToActionText(->l('Pay via Anaira Multi Payment'));
        ->setAction(->context->link->getModuleLink(->name, 'create', array(), true));
        ->setAdditionalInformation(->fetch('module:anairamultipayment/views/templates/hook/payment_options.tpl'));
        return array();
    }
}
