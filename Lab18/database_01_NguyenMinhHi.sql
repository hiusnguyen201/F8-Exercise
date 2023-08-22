CREATE DATABASE database_01_NguyenMinhHieu;
USE database_01_NguyenMinhHieu;

CREATE TABLE courses (
    id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price FLOAT,
    detail TEXT,
    teacher_id INT NOT NULL,
    active INT,
    created_at TIMESTAMP,
    updated_at  TIMESTAMP
);

ALTER TABLE courses ADD description TEXT AFTER price;

ALTER TABLE courses CHANGE COLUMN detail content TEXT NOT NULL;

CREATE TABLE teacher (
    id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO teacher(id, name, bio, created_at, updated_at)
VALUES (1, 'Nguyen Van A', null , now(), now()), 
(2, 'Tran Van B', null , now(), now()), 
(3, 'Truong Ngoc C', 'something', now(), now());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (1, 'Html', 10000, 'khoa hoc html', 1, 0, now(), now()),
(2, 'Css', 15000, 'khoa hoc css', 1, 1, now(), now()),
(3, 'Javascript', 20000, 'khoa hoc js', 1, 1, now(), now()),
(4, 'Java', 35000, 'khoa hoc java', 2, 1, now(), now()),
(5, 'Ruby', 22000, 'khoa hoc ruby', 2, 0, now(), now()),
(6, 'NodeJs', 8000, 'khoa hoc nodejs', 2, 1, now(), now()),
(7, 'Sass', 4000, 'khoa hoc sass', 3, 1, now(), now()),
(8, 'NextJs', 6000, 'khoa hoc nextjs', 3, 1, now(), now()),
(9, 'ReactJs', 3000, 'khoa hoc reactjs', 3, 0, now(), now());

UPDATE courses SET name= "C++", price= 100000, updated_at = now() WHERE id = 1;
UPDATE courses SET name= "C", price= 80000, updated_at = now() WHERE id = 2;
UPDATE courses SET name= "C#", price= 900000, updated_at = now() WHERE id = 3;
UPDATE courses SET name= "PHP", price= 200000, updated_at = now() WHERE id = 4;
UPDATE courses SET name= "Python", price= 0, updated_at = now() WHERE id = 5;
UPDATE courses SET name= "Golang", price= 125000, updated_at = now() WHERE id = 6;
UPDATE courses SET name= "Kotlin", price= 225000, updated_at = now() WHERE id = 7;
UPDATE courses SET name= "Swift", price= 325000, updated_at = now() WHERE id = 8;
UPDATE courses SET name= "Shell", price= 425000, updated_at = now() WHERE id = 9;

UPDATE teacher SET bio= "Fullstack", updated_at = now() WHERE id = 1;
UPDATE teacher SET bio= "BackEnd", updated_at = now() WHERE id = 2;
UPDATE teacher SET bio= "FrontEnd", updated_at = now() WHERE id = 3;

SELECT * FROM teacher;
SELECT * FROM courses;


