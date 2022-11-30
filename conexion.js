const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pedidosListya');

const objectobd = mongoose.connection

objectobd.on('connected', ()=>{console.log('Conexion Correcta o mongoDb')})
objectobd.on('error', ()=>{console.log('Error en la conexion')})

module.exports = mongoose
