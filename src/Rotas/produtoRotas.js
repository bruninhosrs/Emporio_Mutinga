// ./routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obter um produto pelo ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Criar um novo produto
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
