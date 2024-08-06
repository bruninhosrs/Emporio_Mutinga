// Vendas de Caixa
const Sale = require('../models/Sales');
const Product = require('../models/Product');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.createSale = async (req, res) => {
    try {
        const { userId, cashierId, productId, quantity, discount } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).send('Produto não encontrado!');

        const totalPrice = (product.price * quantity) - discount; // Calcula o preço total com desconto
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

// Emissão de Recibo
exports.generateReceipt = (req, res) => {
    const saleId = req.params.id;
    // Aqui você buscaria os detalhes da venda pelo saleId
    // Por agora, vamos assumir que os detalhes são hardcoded ou você já os recuperou

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt_${saleId}.pdf"`);

    doc.pipe(res);

    doc.fontSize(25).text('Recibo de Venda', 100, 50);
    doc.text(`ID da Venda: ${saleId}`, 100, 100);
    // Adicione mais detalhes da venda aqui

    doc.end();
};