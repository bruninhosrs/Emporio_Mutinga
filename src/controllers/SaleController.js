// Vendas de Caixa
const Sale = require('../models/Sales');
const Product = require('../models/Product');
const User = require('../models/User');
const CashRegister = require('../models/CashRegister');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.createSale = async (req, res) => {
    try {
        const { userId, registerNumber, productId, quantity, discount } = req.body;

        // Verifica se o produto existe
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).send('Produto não encontrado!');

        // Verifica se há estoque suficiente do produto
        if (product.stock < quantity) {
            return res.status(400).send('Estoque insuficiente');
        }

        // Atualiza o estoque do produto
        product.stock -= quantity;
        await product.save();

        // Calcula o preço total com desconto
        const totalPrice = (product.price * quantity) - discount; 

        // Verifica se o caixa está aberto
        const openCashRegister = await CashRegister.findOne({
            where: { registerNumber, status: 'aberto' }
        });

        if (!openCashRegister) {
            return res.status(400).send('O caixa está fechado ou não existe.');
        }

        // Cria a venda
        const sale = await Sale.create({
            userId,
            registerNumber,
            productId,
            quantity,
            discount,
            totalPrice
        });

        // Atualiza o saldo do caixa após a venda
        openCashRegister.openingBalance = parseFloat(openCashRegister.openingBalance) + parseFloat(totalPrice);
        await openCashRegister.save();

        res.status(201).json(sale);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Lista todas as vendas
exports.listSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Emissão de Recibo
exports.generateReceipt = async (req, res) => {
    const saleId = req.params.id;

    try {
        const sale = await Sale.findByPk(saleId, {
            include: [
                { model: Product, as: 'Product' },
                { model: User, as: 'User' },
                { model: CashRegister, as: 'CashRegister' }
            ]
        });
        console.log(sale.toJSON()); // Isto mostrará todos os detalhes do objeto sale

        if (!sale) {
            return res.status(404).send('Venda não encontrada');
        }

        console.log('Dados da venda:', sale.toJSON());

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt_${saleId}.pdf"`);

        doc.pipe(res);
        doc.fontSize(27).text('Recibo de Venda', 200, 50);// x -> qunto menor for, ele fica pra esquerda & // y -> quanto menor for, ele fica pra cima
        doc.fontSize(12).text(`ID da Venda: ${sale.id}`, 50, 100);
        doc.fontSize(12).text(`Caixa: ${sale.registerNumber.id} - ${sale.registerNumber.location}`, 50, 150);
        doc.fontSize(12).text(`Vendedor: ${sale.User.username}`, 50, 200);
        doc.fontSize(12).text(`Código de Barras: ${sale.Product.barcode}`, 50, 250);
        doc.fontSize(12).text(`Produto: ${sale.Product.name}`, 50, 300);
        doc.text(`Quantidade: ${sale.quantity}`, 50, 350);
        doc.text(`Total: R$ ${parseFloat(sale.totalPrice).toFixed(2)}`, 50, 400); // Converte para float antes de usar toFixed

        doc.end();
    } catch (error) {
        console.error('Erro ao gerar recibo:', error);
        if (!res.headersSent) {
            res.status(500).send('Erro ao gerar recibo');
        }
    }
};