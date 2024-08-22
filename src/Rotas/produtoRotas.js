const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
//const { authenticateToken, authorizeRole } = require('../middleware/authenticateToken');

// Rotas para operações com produtos
router.get('/', ProductController.listAllProducts);
router.post('/', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ProductController.createProduct);
router.put('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ProductController.updateProduct);
router.delete('/:id', /*authenticateToken, authorizeRole(['sub-gerente', 'gerente', 'super-admin']),*/ ProductController.deleteProduct);
router.get('/search', ProductController.searchProducts); // Rota para pesquisa de produtos

module.exports = router;