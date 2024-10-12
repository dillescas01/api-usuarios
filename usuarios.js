const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password, direccion } = req.body;
        const user = new User({ nombre, email, password, direccion });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta para autenticar al usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Error al autenticar el usuario' });
    }
});

// Ruta para actualizar el perfil de usuario
router.put('/profile', async (req, res) => {
    try {
        const { userId, nombre, direccion } = req.body;
        const user = await User.findByIdAndUpdate(userId, { nombre, direccion }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el perfil' });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'nombre email direccion');
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener los usuarios' });
    }
});

// Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el usuario' });
    }
});


module.exports = router;
