// Criação de Caixa
const express = require('express');
const router = express.Router();
const CashRegisterController = require('../controllers/CashRegisterController');
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

router.post('/', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.createCashRegister);
router.put('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.updateCashRegister);
router.delete('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), CashRegisterController.deleteCashRegister);
router.get('/', CashRegisterController.listAllCashRegisters);

module.exports = router;