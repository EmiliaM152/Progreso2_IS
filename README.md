Link del video:  

https://www.youtube.com/watch?v=LQ_LnoQ0hMQ

Este documento describe los pasos necesarios para ejecutar los tres servicios:

### Servicio SOAP (Consulta de Disponibilidad)
### API REST (Gestión de Reservas)
### Microservicio (Gestión de Inventario)

## Requisitos Previos
Node.js: Instalación de Node.js y NPM.
Descarga desde: https://nodejs.org/.
SQL Server: Instalación de SQL Server (local o remoto).
Herramientas para Pruebas:
SOAP UI para probar el servicio SOAP.
Postman o Swagger UI para probar los endpoints REST.
Editor de Código: Visual Studio Code o equivalente.
Git (opcional): Para clonar repositorios.
Configurar Variables de Entorno: Crear un archivo .env en la raíz del backend:

### Servicio SOAP (Consulta de Disponibilidad)
## Configurar la Base de Datos
Crear la base de datos db_availability en SQL Server.
## Iniciar el Servidor
node soap-service.js
## Probar el Servicio en SOAP UI
URL del WSDL: http://localhost:8000/RoomAvailabilityService?wsdl

### API REST - Gestión de Reservas
## Descripción del Servicio
Permite crear, consultar y cancelar reservas de habitaciones.
## Instalar Dependencias
npm install
## Configurar la Base de Datos
Crear la base de datos reservations_db.
## Iniciar el Servidor
node app.js
## Probar la API en Postman o Swagger
Crear Reserva (POST): http://localhost:3000/v1/reservaciones
{
  "room_number": 101,
  "customer_name": "John Doe",
  "start_date": "2024-12-20",
  "end_date": "2024-12-25"
}
Consultar Reserva (GET): http://localhost:3000/v1/reservaciones/1
Cancelar Reserva (DELETE): http://localhost:3000/v1/reservaciones/1
Documentación de la API
Acceder a la documentación Swagger en: http://localhost:3000/api-docs

### Microservicio - Gestión de Inventario
## Descripción del Servicio
Permite registrar habitaciones y actualizar su estado.
## Instalar Dependencias
npm install
## Configurar la Base de Datos
Crear la base de datos inventory_db.
## Iniciar el Servidor
node app.js
Probar la API en Postman
Registrar Habitación (POST): http://localhost:4000/rooms
{
  "room_number": 101,
  "room_type": "Deluxe",
  "status": "Available"
}
Actualizar Estado de Habitación (PATCH): http://localhost:4000/rooms/1
{
  "status": "Maintenance"
}

### Conclusión
Con estos pasos puedes ejecutar los tres servicios independientes:

Servicio SOAP: Consulta disponibilidad de habitaciones.
API REST: Gestiona las reservas.
Microservicio: Administra el inventario de habitaciones.
Cada servicio tiene su propia base de datos y configuración, lo cual asegura independencia y escalabilidad.

Si tienes problemas, verifica que las variables de entorno estén correctas y que SQL Server esté corriendo.
