var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión a la base de datos establecida satisfactoriamente...");

        // Creacion del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3000");
        });

    })
    .catch(err => console.log(err));