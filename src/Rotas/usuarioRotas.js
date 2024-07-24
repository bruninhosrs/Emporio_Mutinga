const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rotas para operações com usuários
router.get('/', UserController.listAllUsers);
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;