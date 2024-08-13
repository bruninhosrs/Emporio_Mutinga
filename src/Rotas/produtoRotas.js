const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

// Rotas para operações com produtos
router.get('/', authenticateToken, authorizeRole(['gerente', 'super-admin']), ProductController.listAllProducts);
router.post('/', ProductController.createProduct);
router.put('/:id', authenticateToken, authorizeRole(['gerente', 'super-admin']), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/search', ProductController.searchProducts); // Rota para pesquisa de produtos

module.exports = router;