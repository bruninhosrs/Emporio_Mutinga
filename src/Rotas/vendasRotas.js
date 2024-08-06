// Vendas de Caixa
const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');

router.post('/', SaleController.createSale);
router.get('/', SaleController.listSales);

module.exports = router;