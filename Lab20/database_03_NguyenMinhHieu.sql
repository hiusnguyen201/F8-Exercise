DROP DATABASE database_03_NguyenMinhHieu;
CREATE DATABASE database_03_NguyenMinhHieu;
USE database_03_NguyenMinhHieu;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(10) NOT NULL,
    name VARCHAR(150) NOT NULL,
    original_price DOUBLE NOT NULL DEFAULT 0,
    sale_price DOUBLE NOT NULL DEFAULT 0,
    description TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    intructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE product_attributes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    attribute_name VARCHAR (100),
    atrribute_value VARCHAR (50),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products(sku, name, original_price, sale_price, description, quantity, intructions)
VALUES('1231414', 'Ao phong nam', 290000, 240000, 'Ao phong nam mau den', 2, 'Giat o nhiet do khong qua 30 do C'),
('1231416', 'Giay the thao nu', 500000, 400000, 'Giay the thao nu mau trang', 10, 'Ve sinh bang khan am'),
('1231412', 'Dong ho nam', 100000, 60000, 'Dong ho nam day da mau nau', 0, 'Tranh tiep xuc voi nuoc'),
('1231410', 'Tui xach nu', 0, 0, 'Tui xach nu mau hong', 1, 'Tranh tiep xuc voi chat long'),
('1231419', 'Quan jeans nam', 600000, 300000, 'Quan jeans nam mau xanh', 22, 'Giat rieng voi quan ao khac'),
('1231444', 'Balo hoc sinh', 20000, 15000, 'Balo hoc sinh mau do', 35, 'Tranh chong qua nhieu do');

INSERT INTO product_attributes(product_id, attribute_name, atrribute_value)
VALUES (1, 'Kich co', 'L'), (1, 'Mau sac', 'Den'),
(2, 'Kich co', 'M'), (2, 'Mau sac', 'Trang'),
(3, 'Loai', 'Analog'), (3, 'Mau sac day', 'Nau'),
(4, 'Loai', 'Tui xach'), (4, 'Mau sac', 'Hong'),
(5, 'Kich co', 'M'), (5, 'Mau sac', 'Xanh'),
(6, 'Phong cach', 'Hoc sinh'), (6, 'Mau sac', 'Do');

SELECT * FROM products;
SELECT * FROM product_attributes WHERE id = 2;
SELECT * FROM products WHERE quantity > 0;