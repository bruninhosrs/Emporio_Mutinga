const Product = require('../models/Product');
const { Op } = require('sequelize'); // Importe Op para usar operadores

// Lista todos os produtos
exports.listAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Busca um produto pelo ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Produto não encontrado!');
    }
    res.json(product);
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
      res.status(200).send("Produto deletado com sucesso!");
    } else {
      res.status(404).send("Produto não encontrado!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Função de busca pelo nome, código de barras ou categoria do produto
exports.searchProducts = async (req, res) => {
  try {
      const { search } = req.query; // Recebe o termo de busca da query string
      const products = await Product.findAll({
          where: {
              [Op.or]: [
                  { name: { [Op.like]: `%${search}%` } }, // Busca por nome
                  { barcode: { [Op.eq]: search } }, // Busca por código de barras
                  { category: { [Op.like]: `%${search}%` } } // Busca por categoria
              ]
          }
      });
      res.json(products); // Retorna a lista de produtos encontrados
  } catch (error) {
      res.status(500).send(error.message);
  }
};