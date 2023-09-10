DROP DATABASE IF EXISTS database_05_NguyenMinhHieu;
CREATE DATABASE database_05_NguyenMinhHieu;
USE database_05_NguyenMinhHieu;

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


-- Câu 1: Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan tương ứng 
-- với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm thì cũng liệt kê thông tin của đơn đặt phòng đó ra
-- TongTienHat = GiaPhong * (GioKetThuc – GioBatDau) 
-- TongTienSuDungDichVu = SoLuong * DonGia 
-- TongTienThanhToan = TongTienHat + sum (TongTienSuDungDichVu)

SELECT Orders.id, Orders.room_id, Rooms.type_room, Rooms.price, Orders.created_at, 
Rooms.price * (TIME_TO_SEC(TIMEDIFF(Orders.end_time, Orders.start_time)) / 3600) AS totalRoomPrice,
IFNULL(SUM(Services_Details.amount * Services.price), 0) AS totalServicePrice,
(Rooms.price * (TIME_TO_SEC(TIMEDIFF(Orders.end_time, Orders.start_time)) / 3600)) + IFNULL(SUM(Services_Details.amount * Services.price), 0) AS totalPrice
FROM Orders
INNER JOIN Rooms ON Rooms.id = Orders.room_id
INNER JOIN Customers ON  Customers.id = Orders.customer_id
LEFT JOIN Services_Details ON  Services_Details.order_id = Orders.id
LEFT JOIN Services ON  Services.id = Services_Details.service_id
GROUP BY order_id;

-- Câu 2: Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
SELECT Customers.* 
FROM Customers
INNER JOIN Orders ON Customers.id = Orders.customer_id
WHERE Customers.address = 'Hoa xuan' AND Orders.status = 'Da dat';

-- Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của 
-- những phòng được khách hàng đặt có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”
SELECT Rooms.id, Rooms.type_room, Rooms.max_customer, Rooms.price, COUNT(Rooms.id)
FROM Rooms 
INNER JOIN Orders ON Orders.room_id = Rooms.id
WHERE Orders.status = 'Da dat'
GROUP BY Rooms.id
HAVING COUNT(Rooms.id) > 2;