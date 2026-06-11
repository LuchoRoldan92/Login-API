const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

   // Importamos rutas //

const usuariosRoutes =
require('./routes/usuarios');

app.use('/', usuariosRoutes);

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    );

});