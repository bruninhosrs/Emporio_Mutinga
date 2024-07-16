const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ajuste o caminho conforme necessário

// Listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obter um pedido pelo ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Criar um novo pedido
router.post('/', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Atualizar um pedido
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] > 0) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Deletar um pedido
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send('Order deleted');
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
