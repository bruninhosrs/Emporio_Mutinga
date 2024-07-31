const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');

// Rotas para operações com fornecedor 
router.post('/', SupplierController.createSupplier);
router.put('/:id', SupplierController.updateSupplier);
router.delete('/:id', SupplierController.deleteSupplier);
router.get('/', SupplierController.listAllSuppliers);

module.exports = router;
