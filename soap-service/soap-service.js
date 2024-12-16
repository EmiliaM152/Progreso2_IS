const fs = require('fs');
const http = require('http');
const express = require('express');
const soap = require('soap');
const sql = require('mssql'); // Importar el módulo mssql
const { getConnection } = require('./db'); // Importar la conexión a la base de datos

const app = express();
const PORT = 8000;

let wsdl;

// Leer el archivo WSDL
fs.readFile('./RoomAvailabilityService.wsdl', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading WSDL file:', err);
        return;
    }
    wsdl = data;

    // Servicio SOAP
    const service = {
        RoomAvailabilityService: {
            RoomAvailabilityPort: {
                async checkAvailability(args) {
                    console.log('Request received:', args);

                    // Conectar a la base de datos
                    try {
                        const pool = await getConnection();
                        const query = `
                            SELECT room_id, room_type, available_date, status
                            FROM availability
                            WHERE room_type = @roomType
                            AND available_date BETWEEN @startDate AND @endDate
                            AND status = 'available';
                        `;

                        const result = await pool.request()
                            .input('roomType', sql.NVarChar, args.roomType)    // Pasar parámetros
                            .input('startDate', sql.Date, args.startDate)
                            .input('endDate', sql.Date, args.endDate)
                            .query(query);

                        // Construir respuesta dinámica
                        let roomsXML = `<Rooms>`;
                        result.recordset.forEach((room) => {
                            roomsXML += `
                                <Room>
                                    <RoomID>${room.room_id}</RoomID>
                                    <RoomType>${room.room_type}</RoomType>
                                    <AvailableDate>${room.available_date.toISOString().split('T')[0]}</AvailableDate>
                                </Room>`;
                        });
                        roomsXML += `</Rooms>`;

                        return { rooms: roomsXML };

                    } catch (error) {
                        console.error('Database Query Error:', error);
                        return { rooms: '<Error>Database Error</Error>' };
                    }
                }
            }
        }
    };

    // Crear servidor HTTP
    const server = http.createServer(app);

    // Montar servicio SOAP
    soap.listen(server, '/RoomAvailabilityService', service, wsdl, () => {
        console.log(`SOAP Service running at http://localhost:${PORT}/RoomAvailabilityService?wsdl`);
    });

    // Iniciar servidor
    server.listen(PORT, () => {
        console.log('Servicio SOAP iniciado correctamente en el puerto', PORT);
    });
});
