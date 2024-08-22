const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
//const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

// Rotas para operações com pedidos
router.get('/', OrderController.listAllOrder);
router.post('/', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ OrderController.createOrder);
router.put('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ OrderController.updateOrder);
router.delete('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ OrderController.deleteOrder);

module.exports = router;
