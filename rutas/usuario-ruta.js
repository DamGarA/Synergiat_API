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

router.post('/agregar-usuario', (req, res) => {
    const nuevoUsuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idUsuario: req.body.idUsuario,
    })

    nuevoUsuario.save(function(err){
        if(!err){
            res.send('Exito al agregar el usuario')
        } else {
            res.send(err)
        }
    })
})