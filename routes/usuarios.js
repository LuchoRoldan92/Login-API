const express = require('express');

const router = express.Router();

const controlador =
require('../controllers/usuariosController');

router.post('/registro', controlador.registro);

router.post('/login', controlador.login);

router.get('/usuarios', controlador.obtenerUsuarios);

router.get('/usuarios/:usuario',
controlador.obtenerUsuario);

module.exports = router;