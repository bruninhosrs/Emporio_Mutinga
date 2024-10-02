// Criação de Caixa
const express = require('express');
const router = express.Router();
const CashRegisterController = require('../controllers/CashRegisterController');
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

// Operações de caixa para um caixa específico (registerNumber)
router.post('/open', authenticateToken, authorizeRole(['gerente', 'super-admin']), CashRegisterController.openCashRegister);
router.post('/close/:registerNumber', authenticateToken, authorizeRole(['gerente', 'super-admin']), CashRegisterController.closeCashRegister);
router.post('/entry/:registerNumber', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.addEntry);
router.post('/exit/:registerNumber', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.addExit);
router.post('/cashout/:registerNumber', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.cashOut);
router.get('/balance/:registerNumber', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.getBalance);

module.exports = router;