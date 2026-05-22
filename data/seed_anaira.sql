-- Anaira Glamping seed data
INSERT INTO ps_product (id_product, id_supplier, id_manufacturer, id_category_default, id_shop_default, indexed, date_add, date_upd, active)
VALUES (9001,0,0,2,1,1,NOW(),NOW(),1),(9002,0,0,2,1,1,NOW(),NOW(),1),(9003,0,0,2,1,1,NOW(),NOW(),1)
ON DUPLICATE KEY UPDATE date_upd=NOW();

INSERT INTO ps_product_lang (id_product,id_shop,id_lang,name,description_short,link_rewrite)
VALUES
(9001,1,1,'Anaira Balcony','Balcony max 4 orang, AC, Android TV, amenities','anaira-balcony'),
(9002,1,1,'Anaira Porch','Porch max 4 orang, Fan/Kipas, Android TV, amenities','anaira-porch'),
(9003,1,1,'Anaira Villa','Villa max 20 orang, AC, Android TV, kitchen, karaoke set','anaira-villa')
ON DUPLICATE KEY UPDATE name=VALUES(name), description_short=VALUES(description_short);

INSERT INTO ps_htl_room_type (id_product, adult, children, max_guest, room_num, floor)
VALUES (9001,2,2,4,6,1),(9002,2,2,4,6,1),(9003,10,10,20,1,1)
ON DUPLICATE KEY UPDATE max_guest=VALUES(max_guest), room_num=VALUES(room_num);

CREATE TABLE IF NOT EXISTS ps_anaira_room_pricing (
  id_product INT NOT NULL PRIMARY KEY,
  weekday_price DECIMAL(20,6) NOT NULL,
  weekend_price DECIMAL(20,6) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO ps_anaira_room_pricing (id_product, weekday_price, weekend_price)
VALUES (9001,500000,700000),(9002,350000,420000),(9003,2100000,3000000)
ON DUPLICATE KEY UPDATE weekday_price=VALUES(weekday_price), weekend_price=VALUES(weekend_price);

CREATE TABLE IF NOT EXISTS ps_package (
  id_package INT AUTO_INCREMENT PRIMARY KEY,
  package_code VARCHAR(64) UNIQUE,
  package_name VARCHAR(128) NOT NULL,
  package_price DECIMAL(20,6) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1
);
INSERT INTO ps_package (package_code,package_name,package_price)
VALUES ('breakfast','Breakfast',150000),('bbq','BBQ',350000),('honeymoon','Honeymoon',500000),('family','Family',650000)
ON DUPLICATE KEY UPDATE package_price=VALUES(package_price);

CREATE TABLE IF NOT EXISTS ps_anaira_payment_log (
  id_anaira_payment_log INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_order INT UNSIGNED NULL,
  id_cart INT UNSIGNED NULL,
  gateway VARCHAR(32) NOT NULL,
  provider_transaction_id VARCHAR(128) NULL,
  merchant_reference VARCHAR(128) NOT NULL,
  amount DECIMAL(20,2) NOT NULL,
  currency VARCHAR(8) NOT NULL DEFAULT 'IDR',
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  request_hash VARCHAR(128) NULL,
  last_event_hash VARCHAR(128) NULL,
  safe_message VARCHAR(255) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id_anaira_payment_log),
  UNIQUE KEY uniq_merchant_reference (merchant_reference)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO ps_configuration (`name`,`value`,`date_add`,`date_upd`) VALUES
('ANAIRA_GLAMPING_POLICY_CHECKIN','13:00',NOW(),NOW()),
('ANAIRA_GLAMPING_POLICY_CHECKOUT','12:00',NOW(),NOW()),
('ANAIRA_GLAMPING_POLICY_FLEX','Early check-in dan late checkout menyesuaikan ketersediaan',NOW(),NOW()),
('ANAIRA_GLAMPING_POLICY_REFUND','DP hangus, bisa reschedule',NOW(),NOW()),
('ANAIRA_WHATSAPP_NUMBER','081399693499',NOW(),NOW()),
('ANAIRA_WHATSAPP_NUMBER_INTL','6281399693499',NOW(),NOW())
ON DUPLICATE KEY UPDATE value=VALUES(value), date_upd=NOW();
