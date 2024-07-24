const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Rotas para operações com pedidos
router.get('/', OrderController.listAllOrder);
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
