var express = require('express');
var ProductosController = require('../controllers/productos.controller');

var router = express.Router();

router.post('/crear', ProductosController.guardarProducto);
router.get('/obtener/:id?', ProductosController.obtenerProducto);
router.get('/obtenerLista', ProductosController.obtenerProductos);
router.put('/editar/:id', ProductosController.editarProducto);
router.delete('/eliminar/:id', ProductosController.eliminarProducto);


module.exports = router;