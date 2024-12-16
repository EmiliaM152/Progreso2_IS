CREATE DATABASE db_availability

USE db_availability;
CREATE TABLE availability (
    room_id INT PRIMARY KEY IDENTITY(1,1),
    room_type VARCHAR(50) NOT NULL,
    available_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);

INSERT INTO availability (room_type, available_date, status)
VALUES 
    ('Deluxe', '2024-12-20', 'available'),
    ('Suite', '2024-12-20', 'available'),
    ('Deluxe', '2024-12-21', 'maintenance');
	   SELECT * FROM availability

		   SELECT room_id, room_type, available_date, status
	FROM availability
	WHERE room_type = 'Deluxe'
	AND available_date BETWEEN '2024-12-20' AND '2024-12-21'
	AND status = 'available';
