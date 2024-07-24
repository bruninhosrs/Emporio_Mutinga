const Product = require('../models/Product');

// Lista todos os produtos
exports.listAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Cria um novo produto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualiza um produto existente
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct);
    } else {
      res.status(404).send('Produto não encontrado!');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deleta um produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send("Produto deletado com sucesso!");
    } else {
      res.status(404).send("Produto não encontrado!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
