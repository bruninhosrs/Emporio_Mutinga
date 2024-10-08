// Criação de Caixa
const express = require('express');
const router = express.Router();
const CashRegisterController = require('../controllers/CashRegisterController');
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

// Operações de caixa para um caixa específico (registerNumber)
router.get('/', CashRegisterController.listAllCash);
router.post('/open', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.openCashRegister);
router.post('/close', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.closeCashRegister);
router.post('/withdraw', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.withdrawFromCashRegister); // Sangria de caixa
router.get('/balance/:registerNumber', authenticateToken, CashRegisterController.getCashRegisterBalance);
router.get('/sales/:registerNumber', authenticateToken, CashRegisterController.getSalesByMethod);

module.exports = router;
