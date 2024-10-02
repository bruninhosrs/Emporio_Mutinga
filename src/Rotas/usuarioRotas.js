const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');
const UserController = require('../controllers/UserController');


// Rotas para operações com usuários
router.get('/', UserController.listAllUsers);
router.post('/register', authenticateToken, authorizeRole(['sub-gerente','gerente', 'super-admin']),  UserController.createUser);
router.post('/login',  UserController.login);
router.get('/details', authenticateToken, authorizeRole(['sub-gerente','gerente', 'super-admin']), UserController.getUserDetails); // Detalhes do usuário (necessário autenticação e ser 'gerente' ou 'super-admin')
router.put('/:id', authenticateToken, authorizeRole(['sub-gerente','gerente', 'super-admin']), UserController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['sub-gerente','gerente', 'super-admin']), UserController.deleteUser);

module.exports = router;