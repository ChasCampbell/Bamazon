USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department VARCHAR(40) NOT NULL,
  price INT default 0,
  stock INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, price, stock)
VALUES ("screwdriver_flat_blade", "hardware", 7.99, 8);
INSERT INTO products (product_name, department, price, stock)
VALUES ("screwdriver_phillips", "hardware", 7.99, 7);
INSERT INTO products (product_name, department, price, stock)
VALUES ("screwdriver_torx", "hardware", 8.99, 2);
INSERT INTO products (product_name, department, price, stock)
VALUES ("claw_hammer", "hardware", 11.99, 15);
INSERT INTO products (product_name, department, price, stock)
VALUES ("socket_driver_3.8", "hardware", 12.99, 4);
INSERT INTO products (product_name, department, price, stock)
VALUES ("socke3t set_3/8", "hardware", 19.99, 3);
INSERT INTO products (product_name, department, price, stock)
VALUES ("wrench_adjustable_10", "hardware", 7.99, 5);
INSERT INTO products (product_name, department, price, stock)
VALUES ("box_cutter", "hardware", 5.99, 8);

INSERT INTO products (product_name, department, price, stock)
VALUES ("windshield_washer_fluid", "automotive", 7.99, 8);
INSERT INTO products (product_name, department, price, stock)
VALUES ("oil_quart_10w30", "automotive", 1.99, 7);
INSERT INTO products (product_name, department, price, stock)
VALUES ("stop_leak", "automotive", 8.99, 2);
INSERT INTO products (product_name, department, price, stock)
VALUES ("tire_cleaner", "automotive", 11.99, 15);
INSERT INTO products (product_name, department, price, stock)
VALUES ("washing_liquid", "automotive", 12.99, 4);
INSERT INTO products (product_name, department, price, stock)
VALUES ("polish", "automotive", 6.99, 3);
INSERT INTO products (product_name, department, price, stock)
VALUES ("chrome_cleaner", "automotive", 7.99, 5);
INSERT INTO products (product_name, department, price, stock)
VALUES ("bug_remover", "automotive", 5.99, 8);

INSERT INTO products (product_name, department, price, stock)
VALUES ("tv_flat_screen_35", "electronics", 227.99, 8);
INSERT INTO products (product_name, department, price, stock)
VALUES ("tv_flat_screen_42", "electronics", 299.99, 7);
INSERT INTO products (product_name, department, price, stock)
VALUES ("tv_flat_screen_55", "electronics", 499.99, 2);
INSERT INTO products (product_name, department, price, stock)
VALUES ("tv_flat_screen_70", "electronics", 999.99, 15);
INSERT INTO products (product_name, department, price, stock)
VALUES ("dvd_player_blu_ray", "electronics", 119.99, 4);
INSERT INTO products (product_name, department, price, stock)
VALUES ("headphones", "electronics", 11.99, 3);
INSERT INTO products (product_name, department, price, stock)
VALUES ("clock_digital_alarm", "electronics", 7.99, 2);
INSERT INTO products (product_name, department, price, stock)
VALUES ("thermometer_indoor_outdoor", "electronics", 5.99, 1);

ALTER TABLE products CHANGE price price decimal(6,2);

CREATE TABLE departments (
department_id INTEGER(4) AUTO INCREMENT NOT NULL,
department_name VARCHAR(30) NOT NULL,
over_head_costs INTEGER(6) NOT NULL,
PRIMARY KEY (department_id) 
);

ALTER TABLE products ADD sales DECIMAL(9,2);

ALTER TABLE departments ADD (
product_sales INTEGER(6)
);