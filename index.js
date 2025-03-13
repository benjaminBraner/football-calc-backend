
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./db/config');
const cronJobs = require('./tasks/cronJobs');
const path = require('path');


// Crear servidor de express
const app = express();

// DB
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// CORS
//* Permitir todas las solicitudes desde cualquier origen
app.use(cors())

// Rutas
app.use('/api/football', require('./routes/football'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
})

// Levantar el servidor y escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
	console.log(`_______________________`);
});