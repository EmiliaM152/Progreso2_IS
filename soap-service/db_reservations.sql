CREATE DATABASE db_reservations

USE db_reservations;
CREATE TABLE reservations (
    reservation_id INT PRIMARY KEY IDENTITY(1,1),
    room_number INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);
