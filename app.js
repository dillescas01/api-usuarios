const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://<IP_privada_MV_BD>:27017/usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Error conectando a MongoDB', err));


// Echo test
app.get('/', (req, res) => {
    res.json({ message: 'Echo Test OK' });
});

// Rutas de usuario
app.use('/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
