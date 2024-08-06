const Order = require('../models/Order');

// Lista todos os pedidos
exports.listAllOrder = async (req, res) => {
  try {
    const order = await Order.findAll();
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Cria um novo produto
exports.createOrder = async (req, res) => {
  try {
    const newOrdercreateOrder = await Order.create(req.body);
    res.status(201).json(newOrdercreateOrder);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualiza um produto existente
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Order.update(req.body, { where: { id } });
    if (updated) {
      const updatedOrdercreateOrder = await Order.findByPk(id);
      res.json(updatedOrdercreateOrder);
    } else {
      res.status(404).send('Produto não encontrado!');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deleta um produto
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send("Produto deletado com sucesso!");
    } else {
      res.status(404).send("Produto não encontrado!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
