require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware de CORS
app.use(cors({ origin: '*' }));

// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());

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

// Conexión a la base de datos
sql.connect(dbConfig)
    .then((pool) => {
        if (pool.connected) console.log('✅ Conexión exitosa a SQL Server');
    })
    .catch((err) => console.error('❌ Error en la conexión a SQL Server:', err));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Reservas! Documentación disponible en /api-docs');
});

// Rutas de la API
const routes = require('./routes/routes.js');
app.use('/v1', routes); // Define el prefijo base para las rutas


// Configuración de Swagger para la documentación
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, '../api-documentation/docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta para comprobar el estado de la API
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API funcionando correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    console.log(`📄 Documentación disponible en http://localhost:${port}/api-docs`);
});
