var Productos = require('../models/Productos');


var controller = {

    guardarProducto: function(req, res) {
        var producto = new Productos();

        var params = req.body;
        producto.descripcion = params.descripcion;
        producto.categoria = params.categoria;
        producto.cantidad = params.cantidad;
        producto.precio = params.precio;


        producto.save((err, productoRegistrado) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el documento.' });

            if (!productoRegistrado) return res.status(404).send({ message: 'No se ha podido guardar el producto.' });

            return res.status(200).send({ producto: productoRegistrado });
        });
    },

    obtenerProducto: function(req, res) {
        var productoId = req.params.id;

        if (productoId == null) return res.status(404).send({ message: 'El producto no existe.' });

        Productos.findById(productoId, (err, producto) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!producto) return res.status(404).send({ message: 'El producto no existe.' });

            return res.status(200).send({
                producto
            });

        });
    },

    obtenerProductos: function(req, res) {

        Productos.find((err, productos) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!productos) return res.status(404).send({ message: 'No hay productos que mostrar.' });

            return res.status(200).send({ productos });
        });

    },

    editarProducto: function(req, res) {
        var productoId = req.params.id;
        var update = req.body;

        Productos.findOneAndUpdate(productoId, update, { new: true }, (err, productoActualizado) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!productoActualizado) return res.status(404).send({ message: 'No existe el producto para actualizar' });

            return res.status(200).send({
                producto: productoActualizado
            });
        });

    },

    eliminarProducto: function(req, res) {
        var productoId = req.params.id;

        Productos.findByIdAndDelete(productoId, (err, productoEliminado) => {
            if (err) return res.status(500).send({ message: 'No se ha podido borrar el producto' });

            if (!productoEliminado) return res.status(404).send({ message: "No se puede eliminar ese producto." });

            return res.status(200).send({
                producto: productoEliminado
            });
        });
    },
};

module.exports = controller;