-- Anaira Glamping seed data
INSERT INTO ps_product (id_product, id_supplier, id_manufacturer, id_category_default, id_shop_default, indexed, date_add, date_upd, active)
VALUES (9001,0,0,2,1,1,NOW(),NOW(),1),(9002,0,0,2,1,1,NOW(),NOW(),1),(9003,0,0,2,1,1,NOW(),NOW(),1)
ON DUPLICATE KEY UPDATE date_upd=NOW();

INSERT INTO ps_product_lang (id_product,id_shop,id_lang,name,description_short,link_rewrite)
VALUES
(9001,1,1,'Anaira Balcony','Unit Balcony Anaira','anaira-balcony'),
(9002,1,1,'Anaira Porch','Unit Porch Anaira','anaira-porch'),
(9003,1,1,'Anaira Villa','Unit Villa Anaira','anaira-villa')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO ps_htl_room_type (id_product, adult, children, max_guest, room_num, floor)
VALUES (9001,2,1,3,10,1),(9002,3,1,4,8,1),(9003,4,2,6,5,2)
ON DUPLICATE KEY UPDATE max_guest=VALUES(max_guest);

CREATE TABLE IF NOT EXISTS ps_anaira_room_pricing (
  id_product INT NOT NULL PRIMARY KEY,
  weekday_price DECIMAL(20,6) NOT NULL,
  weekend_price DECIMAL(20,6) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO ps_anaira_room_pricing (id_product, weekday_price, weekend_price)
VALUES (9001,850000,1050000),(9002,1150000,1350000),(9003,1750000,2050000)
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

INSERT INTO ps_configuration (`name`,`value`,`date_add`,`date_upd`) VALUES
('ANARIA_GLAMPING_POLICY_CHECKIN','14:00',NOW(),NOW()),
('ANARIA_GLAMPING_POLICY_CHECKOUT','12:00',NOW(),NOW()),
('ANARIA_GLAMPING_POLICY_REFUND','Gratis H-7, 50% H-3, non-refundable H-1',NOW(),NOW()),
('ANARIA_WHATSAPP_NUMBER','081399693499',NOW(),NOW())
ON DUPLICATE KEY UPDATE value=VALUES(value), date_upd=NOW();
