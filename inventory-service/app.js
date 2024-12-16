require('dotenv').config();
const express = require('express');
const roomsRoutes = require('./routes/roomsRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());

// Importar Swagger YAML
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir rutas del microservicio
app.use('/api', roomsRoutes);

// Ruta raíz de verificación
app.get('/', (req, res) => {
    res.send('Microservicio de Gestión de Inventario en funcionamiento.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Microservicio corriendo en http://localhost:${PORT}`);
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
