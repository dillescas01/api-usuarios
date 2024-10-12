// app.js
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Ruta de echo test para el balanceador de carga
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Echo Test OK' });
});

// Usar las rutas de usuarios con prefijo /users
app.use('/users', usersRoutes);

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://98.82.74.138:27017/usuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Escuchar en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});



