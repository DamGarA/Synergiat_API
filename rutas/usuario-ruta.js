const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemaUsuario = new schema({
    nombre: String,
    email: String,
    telefono: String,
    idUsuario: String
})

const ModeloUsuario = mongoose.model('usuarios', schemaUsuario)
module.exports = router

router.get('/', (req, res) => {
    res.send('entro el get')
})

router.post('/agregar-usuario', async (req, res) => {
    try {
        const nuevoUsuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            idUsuario: req.body.idUsuario,
        });

        await nuevoUsuario.save();
        res.send('Exito al agregar el usuario');
    } catch (error) {
        console.error('Error al guardar en la base de datos:', error);
        res.status(500).send(error);
    }
});
