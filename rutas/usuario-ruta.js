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
router.get('/lista-usuarios', (req, res) => {
    ModeloUsuario.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
});

//Obtener todos los usuarios
router.post('/obtener-usuario-id', (req, res) => {
    ModeloUsuario.find({idUsuario: req.body.idUsuario})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
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
// router.post('/editar-usuario', (req, res) => {
//     const idUsuario = req.body.idUsuario;
//     const nuevosDatos = {
//         nombre: req.body.nombre,
//         email: req.body.email,
//         telefono: req.body.telefono
//     };

//     ModeloUsuario.findOneAndUpdate({ idUsuario: idUsuario }, nuevosDatos, { new: true })
//         .then(docs => {
//             if (!docs) {
//                 return res.status(404).send('Usuario no encontrado');
//             }
//             res.send('Usuario actualizado exitosamente');
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

router.post('/editar-usuario', async (req, res) => {
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
// router.delete('/', (req, res) => {
//     ModeloUsuario.findOneAndDelete({ idUsuario: req.query.idUsuario })
//         .then(docs => {
//             if (!docs) {
//                 return res.status(404).send('Usuario no encontrado');
//             }
//             res.send('Usuario borrado exitosamente');
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

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
