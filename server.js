// Importamos express //
const express = require('express');

// Creamos la aplicación //
const app = express();

// Puerto del servidor //
const PORT = 3000;

// Middleware para recibir datos JSON //
app.use(express.json());

// Base de datos simulada //
let usuarios = [];

  // REGISTRO DE USUARIO //

app.post('/registro', (req, res) => {

    // Obtenemos usuario y contraseña
    const { usuario, password } = req.body;

    // Validamos que los campos existan //
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    // Verificamos si el usuario ya existe //
    const existeUsuario = usuarios.find(
        user => user.usuario === usuario
    );

    if (existeUsuario) {
        return res.status(400).json({
            mensaje: 'El usuario ya existe'
        });
    }

    // Guardamos usuario //
    usuarios.push({
        usuario,
        password
    });

    // Respuesta exitosa //
    res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    });
});

  // INICIO DE SESIÓN //

app.post('/login', (req, res) => {

    // Obtenemos datos//
    const { usuario, password } = req.body;

    // Buscamos usuario //
    const usuarioEncontrado = usuarios.find(
        user =>
            user.usuario === usuario &&
            user.password === password
    );

    // Validamos autenticación //
    if (usuarioEncontrado) {

        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });

    } else {

        return res.status(401).json({
            mensaje: 'Error en la autenticación'
        });

    }
});

   // CONSULTAR TODOS LOS USUARIOS //

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

// CONSULTAR UN USUARIO //

app.get('/usuarios/:usuario', (req, res) => {

    const usuarioEncontrado = usuarios.find(
        user => user.usuario === req.params.usuario
    );

    if (!usuarioEncontrado) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        });
    }

    res.status(200).json(usuarioEncontrado);
});

     // Encendemos el servidor //
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});