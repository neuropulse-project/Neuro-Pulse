const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

router.get('/usuarios', UsuariosController.listar);

router.get('/usuarios/:id', UsuariosController.buscarPorId);

router.post('/usuarios', UsuariosController.criar);

router.put('/usuarios/:id', UsuariosController.editar);

router.delete('/usuarios/:id', UsuariosController.deletar);
module.exports = router;