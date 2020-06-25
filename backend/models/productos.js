var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    descripcion: String,
    categoria: String,
    cantidad: String,
    precio: Number
});

module.exports = mongoose.model('Productos', ProductosSchema);