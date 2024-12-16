const express = require('express');
const router = express.Router();
const reservacionesRouter = require('./reservaciones');

// Registrar las rutas de reservaciones
router.use('/reservaciones', reservacionesRouter);

module.exports = router;
