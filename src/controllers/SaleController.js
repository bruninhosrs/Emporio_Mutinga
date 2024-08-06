// Vendas de Caixa
const Sale = require('../models/Sales');
const Product = require('../models/Product');

exports.createSale = async (req, res) => {
    try {
        const { userId, cashierId, productId, quantity, discount } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send('Produto não encontrado!');
        }
        const totalPrice = (product.price * quantity) - discount;
        const sale = await Sale.create({
            userId,
            cashierId,
            productId,
            quantity,
            discount,
            totalPrice
        });
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
