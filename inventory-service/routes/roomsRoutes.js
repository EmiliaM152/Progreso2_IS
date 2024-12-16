const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

// Ruta para registrar una nueva habitación
router.post('/rooms', roomsController.createRoom);

// Ruta para actualizar el estado de una habitación
router.patch('/rooms/:id', roomsController.updateRoomStatus);

module.exports = router;
