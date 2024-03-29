const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

//Definicion del modelo del usuario
const schemaUsuario = new schema({
    nombre: String,
    email: String,
    telefono: String,
    idUsuario: String
})

const ModeloUsuario = mongoose.model('usuarios', schemaUsuario)
module.exports = router

//Rutas

//Obtener todos los usuarios
router.get('/lista-usuarios', async (req, res) => {
    try {
        const docs = await ModeloUsuario.find({});
        res.send(docs);
    } catch (err) {
        res.status(500).send(err.message || 'Error interno del servidor');
    }
});


//Obtener un usuario por su ID
router.post('/obtener-usuario-id', async (req, res) => {
    try {
        const docs = await ModeloUsuario.find({ idUsuario: req.body.idUsuario });
        res.send(docs);
    } catch (err) {
        res.status(500).send(err.message || 'Error interno del servidor');
    }
});


//Agregar un usuario
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

//Editar usuario
router.put('/editar-usuario', async (req, res) => {
    try {
        const idUsuario = req.body.idUsuario;
        const nuevosDatos = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono
        };

        const docs = await ModeloUsuario.findOneAndUpdate({ idUsuario: idUsuario }, nuevosDatos, { new: true });

        if (!docs) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.send('Usuario actualizado exitosamente');
    } catch (err) {
        res.status(500).send(err.message || 'Error interno del servidor');
    }
});


//Borrar usuario
router.delete('/', async (req, res) => {
    try {
        const docs = await ModeloUsuario.findOneAndDelete({ idUsuario: req.query.idUsuario });

        if (!docs) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.send('Usuario borrado exitosamente');
    } catch (err) {
        res.status(500).send(err.message || 'Error interno del servidor');
    }
});
