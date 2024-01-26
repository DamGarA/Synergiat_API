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

router.get('/ejemplo', (req, res) => {
    res.end('Ruta ejemplo')
})