const Order = require('../models/Order');

// Lista todos os pedidos
exports.listAllOrders = async (req, res) => {
  try {
    const order = await Order.findAll();
    res.json(order);
  } catch (error) {
    res.status(500).send(`Erro ao listar pedidos: ${error.message}`);
  }
};

// Busca um Pedido pelo ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).send('Pedido não encontrado!');
    }
    res.json(order);
  } catch (error) {
    res.status(500).send(`Erro ao listar pedidos: ${error.message}`);
  }
};

// Cria um novo Pedido
exports.createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, status } = req.body;

    // Validação básica
    if (!userId || !productId || !quantity) {
      return res.status(400).send('Campos obrigatórios: userId, productId e quantity.');
    }

    const newOrder = await Order.create({ userId, productId, quantity, status });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send(`Erro ao criar pedido: ${error.message}`);
  }
};

// Atualiza um Pedido existente
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Order.update(req.body, { where: { id } });
    if (updated) {
      const updatedOrder = await Order.findByPk(id);
      res.json(updatedOrder);
    } else {
      res.status(404).send('Pedido não encontrado!');
    }
  } catch (error) {
    res.status(500).send(`Erro ao atualizar pedido: ${error.message}`);
  }
};

// Deleta um Pedido
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send("Pedido deletado com sucesso!");
    } else {
      res.status(404).send("Pedido não encontrado!");
    }
  } catch (error) {
    res.status(500).send(`Erro ao atualizar pedido: ${error.message}`);
  }
};
