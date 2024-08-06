// Criação de Caixa
const express = require('express');
const router = express.Router();
const CashRegisterController = require('../controllers/CashRegisterController');

router.post('/', CashRegisterController.createCashRegister);
router.put('/:id', CashRegisterController.updateCashRegister);
router.delete('/:id', CashRegisterController.deleteCashRegister);
router.get('/', CashRegisterController.listAllCashRegisters);

module.exports = router;
