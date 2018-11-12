DROP DATABASE IF EXISTS bamazon_db;
    CREATE DATABASE bamazon_db;
    USE bamazon_db;

    CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
     product_name VARCHAR(100),
     department_name VARCHAR(100),
     price DECIMAL(10,2)NULL,
     stock_quantity INT NOT NULL,

     PRIMARY KEY(item_id)
      

    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Apple Ipad", "electronics", 699, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Incase", "protection", 39.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("LED Lights", "decoration", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("CaseLogic Backpack", "school Supply", 89.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Smart Plug", "electronics", 19.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("JBL Speaker", "electronics", 149.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Canon EOS R", "electronics", 2499.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Michael Kors", "Jewelry", 399.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Rayband Sunglasses", "eyewear", 149.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Office Desk", "Office Supply", 199.99, 70);






SELECT * FROM products;
