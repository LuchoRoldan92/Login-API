const usuarios = require('../data/usuarios');

       // REGISTRO //

const registro = (req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const existeUsuario = usuarios.find(
        user => user.usuario === usuario
    );

    if (existeUsuario) {
        return res.status(400).json({
            mensaje: 'El usuario ya existe'
        });
    }

    usuarios.push({
        usuario,
        password
    });

    res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    });
};

             // LOGIN //

const login = (req, res) => {

    const { usuario, password } = req.body;

    const usuarioEncontrado = usuarios.find(
        user =>
            user.usuario === usuario &&
            user.password === password
    );

    if (usuarioEncontrado) {

        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });

    }

    return res.status(401).json({
        mensaje: 'Error en la autenticación'
    });
};

     // CONSULTAR TODOS //

const obtenerUsuarios = (req, res) => {

    res.status(200).json(usuarios);

};

     // CONSULTAR UNO //

const obtenerUsuario = (req, res) => {

    const usuarioEncontrado = usuarios.find(
        user => user.usuario === req.params.usuario
    );

    if (!usuarioEncontrado) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        });
    }

    res.status(200).json(usuarioEncontrado);

};

module.exports = {
    registro,
    login,
    obtenerUsuarios,
    obtenerUsuario
};