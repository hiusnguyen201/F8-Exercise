CREATE DATABASE database_02_NguyenMinhHieu;
USE database_02_NguyenMinhHieu;

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    price DOUBLE NOT NULL,
    description TEXT
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    amount INT NOT NULL,
    totalprice DOUBLE NOT NULL,
    status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT orders_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE orderdetails (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT NOT NULL,
    unit_price DOUBLE NOT NULL,
    CONSTRAINT orderdetails_order_id_foreign FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT orderdetails_product_id_foreign FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (order_id, product_id)
);