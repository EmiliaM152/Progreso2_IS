const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Configuración de SQL Server desde el archivo .env
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: true, // Para Azure
        trustServerCertificate: true // Solo si el certificado no es confiable
    }
};

/**
 * @route GET /reservaciones/:id
 * @description Consultar una reserva específica por su ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Conexión a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL
        const result = await pool.request()
            .input('reservation_id', sql.Int, id)
            .query('SELECT * FROM reservations WHERE reservation_id = @reservation_id');

        if (result.recordset.length === 0) {
            return res.status(404).send('Reserva no encontrada.');
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Error al consultar la reserva:', err);
        res.status(500).send('Error interno del servidor');
    }
});

/**
 * @route POST /reservaciones
 * @description Crear una nueva reserva
 */
router.post('/', async (req, res) => {
    try {
        const { room_number, customer_name, start_date, end_date } = req.body;

        // Validación de los datos de entrada
        if (!room_number || !customer_name || !start_date || !end_date) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        // Conexión a la base de datos
        const pool = await sql.connect(dbConfig);

        // Simulación de verificación de disponibilidad (lógica real puede ser con un servicio SOAP)
        const isAvailable = true; // Simulación
        if (!isAvailable) {
            return res.status(400).send('La habitación no está disponible.');
        }

        // Inserción en la base de datos
        const result = await pool.request()
            .input('room_number', sql.Int, room_number)
            .input('customer_name', sql.NVarChar, customer_name)
            .input('start_date', sql.Date, start_date)
            .input('end_date', sql.Date, end_date)
            .input('status', sql.NVarChar, 'Reserved')
            .query(`
                INSERT INTO reservations (room_number, customer_name, start_date, end_date, status)
                OUTPUT INSERTED.reservation_id
                VALUES (@room_number, @customer_name, @start_date, @end_date, @status)
            `);

        res.status(201).json({
            reservation_id: result.recordset[0].reservation_id,
            message: 'Reserva creada exitosamente.'
        });

    } catch (err) {
        console.error('Error al crear la reserva:', err);
        res.status(500).send('Error interno del servidor');
    }
});

/**
 * @route DELETE /reservaciones/:id
 * @description Cancelar una reserva específica por su ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Conexión a la base de datos
        const pool = await sql.connect(dbConfig);

        // Eliminación de la reserva
        const result = await pool.request()
            .input('reservation_id', sql.Int, id)
            .query('DELETE FROM reservations WHERE reservation_id = @reservation_id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Reserva no encontrada.');
        }

        res.status(200).send('Reserva cancelada exitosamente.');
    } catch (err) {
        console.error('Error al cancelar la reserva:', err);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
