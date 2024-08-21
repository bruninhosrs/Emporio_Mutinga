const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');
const SupplierController = require('../controllers/SupplierController');

// Rotas para operações com fornecedor 
router.post('/', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), SupplierController.createSupplier);
router.put('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), SupplierController.updateSupplier);
router.delete('/:id', authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']), SupplierController.deleteSupplier);
router.get('/', SupplierController.listAllSuppliers);

module.exports = router;
