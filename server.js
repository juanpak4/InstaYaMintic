const express = require('express')
const app = express()

//Importat conexion mongoDB
const archivoBD = require('./conexion')

//Importacion del archivo de rutas y modelo de pedidos
const rutasPedidos = require('./rutes/pedidos')

//Importacion body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/pedidos', rutasPedidos)


app.get('/', (req,res) => {
    res.end('bienvenidodssd')
})

//Configuracion server
app.listen(5000, function(){
    console.log('el serv esta en linea')
})