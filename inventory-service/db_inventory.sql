CREATE DATABASE db_inventory

USE db_inventory;
CREATE TABLE rooms (
    room_id INT PRIMARY KEY IDENTITY(1,1),
    room_number INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL
);
