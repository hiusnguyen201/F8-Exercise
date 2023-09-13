DROP DATABASE IF EXISTS database_lab23_NguyenMinhHieu;
CREATE DATABASE database_lab23_NguyenMinhHieu;
USE database_lab23_NguyenMinhHieu;

CREATE TABLE Customers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO Customers(name, email, password)
VALUES ("Nguyen Van A", "nguyenvana@gmail.com", MD5("123")),
("Nguyen Van B", "nguyenvanb@gmail.com", MD5("123")),
("Phan Van A", "phanvana@gmail.com", MD5("123")),
("Phan Van B", "phanvanb@gmail.com", MD5("123"));

SELECT * FROM Customers;