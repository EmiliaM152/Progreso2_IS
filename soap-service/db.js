const sql = require('mssql');

const config = {
    user: 'admin', // Usuario de SQL Server
    password: 'admin1234', // Contraseña de SQL Server
    server: 'Emilia', // Servidor
    database: 'db_availability',
    options: {
        encrypt: false, // Configurar según tu entorno
        enableArithAbort: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
}

module.exports = { getConnection };
