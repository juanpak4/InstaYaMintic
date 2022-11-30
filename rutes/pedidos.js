const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const eschema = mongoose.Schema
const saltRounds = 10

const eschemaPedido = new eschema({
    nombre: String,
    cedula: String,
    entrega: String,
    entregaHora: String,
    estado: String,
    ancho: String,
    alto: String,
    profundidad: String,
    peso: String,
    ciudadOrigen: String,
    direccionOrigen: String,
    ciudadDestino: String,
    direccionDestino: String,
    fragil: Boolean,
    idUsuario: String,
    idPedido: String,
})

const eschemaUsuario = new eschema({
    idUsuario: String,
    usuario: String,
    nombre: String,
    contraseña: String,
    cedula: String,
    direccion: String,
    correo: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemaUsuario)
const ModeloPedido = mongoose.model('pedidos', eschemaPedido)

module.exports = router

router.post('/agregarUsuario', async (req, res) => {

    const nuevoPedido = new ModeloUsuario({
        idUsuario: req.body.idUsuario,
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        contraseña: await bcrypt.hash(req.body.contraseña, 10),
        cedula: req.body.cedula,
        direccion: req.body.direccion,
        correo: req.body.correo
    })
    await nuevoPedido.save(function (err) {
        if (!err) {
            res.send('usuario agregado Correctamente')
        } else {
            res.send("asdasd")
        }
    })
})


router.post('/agregarPedido', (req, res) => {
    const nuevoPedido = new ModeloPedido({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        entrega: req.body.entrega,
        entregaHora: req.body.entregaHora,
        estado: req.body.estado,
        idUsuario: req.body.idUsuario,
        idPedido: req.body.idPedido,
        alto: req.body.alto,
        ancho: req.body.ancho,
        profundidad: req.body.profundidad,
        peso: req.body.peso,
        ciudadOrigen: req.body.ciudadOrigen,
        direccionOrigen: req.body.direccionOrigen,
        ciudadDestino: req.body.ciudadDestino,
        direccionDestino: req.body.direccionDestino,
        fragil: req.body.fragil
    })
    nuevoPedido.save(function (err) {
        if (!err) {
            res.send('usuario agregado Correctamente')
        } else {
            res.send(err)
        }
    })
})

//obtener todos
router.post('/obtenerPedidos', (req, res) => {
    console.log("esto", req.body.idUsuario)
    ModeloPedido.find({ idUsuario: req.body.idUsuario }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//obtener uno en concreto
router.post('/obtenerDataPedido', (req, res) => {
    ModeloPedido.find({ idPedido: req.body.idPedido }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

router.post('/editarPedido', (req, res) => {
    ModeloPedido.findOneAndUpdate({ idPedido: req.body.idPedido }, {
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        entrega: req.body.entrega,
        entregaHora: req.body.entregaHora,
        estado: req.body.estado,
        idUsuario: req.body.idUsuario,
        idPedido: req.body.idPedido,
        alto: req.body.alto,
        ancho: req.body.ancho,
        profundidad: req.body.profundidad,
        peso: req.body.peso,
        ciudadOrigen: req.body.ciudadOrigen,
        direccionOrigen: req.body.direccionOrigen,
        ciudadDestino: req.body.ciudadDestino,
        direccionDestino: req.body.direccionDestino,
        fragil: req.body.fragil
    }, (err) => {
        if (!err) {
            res.send('usuario actualizafo correctamente')
        } else {
            res.send(err)
        }
    })
})

router.post('/eliminarPedido', (req, res) => {
    ModeloPedido.findOneAndDelete({ idPedido: req.body.idPedido }, (err) => {
        if (!err) {
            res.send('usuario actualizafo correctamente')
        } else {
            res.send(err)
        }
    })
})

router.post('/iniciarSesion', async (req, res) => {
    const verify = false
    await ModeloUsuario.findOne({ usuario: req.body.usuario }, async (err, user) => {
        if (err) {
            res.send('ERROR AL AUTENTICAR USUARIO')
        } else if (!user) {
            res.send('EL USUARIO NO EXISTE')
        } else {
            bcrypt.compare(req.body.contraseña, user.contraseña, function (error, isMatch) {
                if (error) {
                    res.send(error);
                } else if (isMatch) {
                    res.send(user)
                } else {
                    res.send()
                }
            });

        }
    })
})

