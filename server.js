require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

//Leer .json
app.use(express.json());

//Administracion de cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Ruta para verificacion de funcionamiento
app.get('/', (req, res) => {
    res.end('Servidor funcionando correctamente')
})

//Conexion con la base de datos
mongoose.set('strictQuery', false)
const connectDB = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB conectado: ${conn.connection.host}`) 
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB().then(() => {
    app.listen(PORT, function () {
        console.log(`Servidor funcionando en el puerto ${PORT}`)
    })
})

//Rutas
const rutaUsuario = require('./rutas/usuario-ruta')

app.use('/api/usuario', rutaUsuario)