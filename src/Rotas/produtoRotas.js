const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authenticateToken = require('../middleware/authenticateToken');

// Aplica autenticação a todas as rotas de produtos
router.use(authenticateToken);

// Rotas para operações com produtos
router.get('/', ProductController.listAllProducts);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/search', ProductController.searchProducts); // Rota para pesquisa de produtos

module.exports = router;