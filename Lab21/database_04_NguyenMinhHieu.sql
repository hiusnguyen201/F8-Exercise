DROP DATABASE database_04_NguyenMinhHieu;
CREATE DATABASE database_04_NguyenMinhHieu;
USE database_04_NguyenMinhHieu;

CREATE TABLE Customers(
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL 
);

CREATE TABLE Rooms(
    id VARCHAR(10) PRIMARY KEY,
    type_room VARCHAR(30) NOT NULL,
    max_customer INT NOT NULL,
    price double NOT NULL,
    description TEXT
);

CREATE TABLE Orders(
    id VARCHAR(10) PRIMARY KEY,
    room_id VARCHAR(10) NOT NULL,
    customer_id VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    initial_deposit DOUBLE NOT NULL,
    note TEXT,
    status VARCHAR(30),
    CONSTRAINT orders_room_id_foreign FOREIGN KEY (room_id) REFERENCES Rooms(id),
    CONSTRAINT orders_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

CREATE TABLE Services(
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price DOUBLE NOT NULL
);

CREATE TABLE Services_Details(
    order_id VARCHAR(10) NOT NULL,
    service_id VARCHAR(10) NOT NULL,
    amount INT NOT NULL,
    CONSTRAINT services_details_order_id_foreign FOREIGN KEY (order_id) REFERENCES Orders(id),
    CONSTRAINT services_details_service_id_foreign FOREIGN KEY (service_id) REFERENCES Services(id)
);

INSERT INTO Customers(id, name, address, phone)
VALUES ('KH0001', 'Nguyen Van A', 'Hoa xuan', '1111111111'),
('KH0002', 'Nguyen Van B', 'Hoa hai', '1111111112'),
('KH0003', 'Phan Van A', 'Cam le', '1111111113'),
('KH0004', 'Phan Van B', 'Hoa Xuan', '1111111114');

INSERT INTO Rooms(id, type_room, max_customer, price, description)
VALUES ('P0001', 'Loai 1', 20, 60000, null),
('P0002', 'Loai 2', 25, 80000, null),
('P0003', 'Loai 3', 15, 50000, null),
('P0004', 'Loai 4', 20, 50000, null);

INSERT INTO Services(id, name, unit, price)
VALUES ('DV001', 'Beer', 'lon', 10000),
('DV002', 'Nuoc ngot', 'lon', 8000),
('DV003', 'Trai cay', 'dia', 350000),
('DV004', 'Khan uot', 'cai', 2000);

INSERT INTO Orders(id, room_id, customer_id, created_at, start_time, end_time, initial_deposit, note, status)
VALUES('DP0001', 'P0001', 'KH0002', '2018/03/26', '11:00', '13:30', 100000, null, 'Da dat'),
('DP0002', 'P0001', 'KH0003', '2018/03/27', '17:15', '19:15', 50000, null, 'Da huy'),
('DP0003', 'P0002', 'KH0002', '2018/03/26', '20:30', '22:15', 100000, null, 'Da dat'),
('DP0004', 'P0003', 'KH0001', '2018/04/01', '19:30', '21:15', 200000, null, 'Da dat');

INSERT INTO Services_Details(order_id, service_id, amount)
VALUES('DP0001', 'DV001', 20), ('DP0001', 'DV003', 3),
('DP0001', 'DV002', 10), ('DP0002', 'DV002', 10),
('DP0002', 'DV003', 1), ('DP0003', 'DV003', 2), ('DP0003', 'DV004', 10);


SELECT * FROM Services_Details WHERE amount BETWEEN 3 AND 10;

UPDATE Rooms SET price = price + 10000 WHERE max_customer > 10;

DELETE Orders, Services_Details FROM Orders
INNER JOIN Services_Details ON Services_Details.order_id = Orders.id
WHERE Orders.status = 'Da huy';

SELECT name FROM Customers WHERE name IN('H%', 'N%', 'M%') AND LENGTH(name) <= 20;

SELECT c.name FROM Customers AS c GROUP BY c.name;

SELECT * FROM Services WHERE (unit = 'lon' AND price > 10000) OR (unit = 'cai' AND PRICE < 5000);

SELECT Orders.id, Orders.room_id, Rooms.type_room, Rooms.max_customer,
Rooms.price, Customers.id, Customers.name, Customers.phone, 
Orders.created_at, Orders.start_time, Orders.end_time, Services.id, Services_Details.amount, Services.price
FROM Orders
INNER JOIN Rooms ON Rooms.id = Orders.room_id
INNER JOIN Customers ON Customers.id = Orders.customer_id
INNER JOIN Services_Details ON Services_Details.order_id = Orders.id
INNER JOIN Services ON Services_Details.service_id = Services.id
WHERE YEAR(Orders.created_at) IN (2016, 2017) AND Rooms.price > 50000;