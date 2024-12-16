const { getConnection } = require('../config/database');

const roomsController = {
    // Registrar una nueva habitación
    createRoom: async (req, res) => {
        const { room_number, room_type, status } = req.body;

        try {
            const pool = await getConnection();
            await pool.request()
                .input('room_number', room_number)
                .input('room_type', room_type)
                .input('status', status)
                .query(`
                    INSERT INTO rooms (room_number, room_type, status)
                    VALUES (@room_number, @room_type, @status)
                `);

            res.status(201).send('Habitación registrada exitosamente.');
        } catch (error) {
            console.error('Error al registrar la habitación:', error);
            res.status(500).send('Error interno del servidor.');
        }
    },

    // Actualizar el estado de una habitación
    updateRoomStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('room_id', id)
                .input('status', status)
                .query(`
                    UPDATE rooms SET status = @status WHERE room_id = @room_id
                `);

            if (result.rowsAffected[0] === 0) {
                return res.status(404).send('Habitación no encontrada.');
            }

            res.send('Estado de la habitación actualizado exitosamente.');
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            res.status(500).send('Error interno del servidor.');
        }
    }
};

module.exports = roomsController;
