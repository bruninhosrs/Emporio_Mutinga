// Vendas de Caixa
const Sale = require('../models/Sales');
const Product = require('../models/Product');
const User = require('../models/User');
const CashRegister = require('../models/CashRegister');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Listagem de Vendas
exports.listSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: User, as: 'User' },
        { model: Product, as: 'Product' },
        { model: CashRegister, as: 'CashRegister' }
      ]
    });
    res.json(sales);
  } catch (error) {
    res.status(500).send('Erro ao listar vendas: ' + error.message);
  }
};

// Criação de Venda
exports.createSale = async (req, res) => {
  try {
    const { userId, registerNumber, productId, quantity, discount, paymentMethod } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).send('Produto não encontrado!');

    if (product.stock < quantity) {
      return res.status(400).send('Estoque insuficiente');
    }

    const totalPrice = (product.price * quantity) - discount;

    product.stock -= quantity;
    await product.save();

    const openCashRegister = await CashRegister.findOne({
      where: { registerNumber, status: 'aberto' }
    });

    if (!openCashRegister) {
      return res.status(400).send('O caixa está fechado ou não existe.');
    }

    const sale = await Sale.create({
      userId,
      registerNumber,
      productId,
      quantity,
      discount,
      totalPrice,
      paymentMethod
    });

    // Atualiza os totais com base no método de pagamento
    if (paymentMethod === 'dinheiro') {
      openCashRegister.totalCashSales = parseFloat(openCashRegister.totalCashSales || 0) + totalPrice;
    } else if (paymentMethod === 'pix') {
      openCashRegister.totalPixSales = parseFloat(openCashRegister.totalPixSales || 0) + totalPrice;
    } else if (paymentMethod === 'debito') {
      openCashRegister.totalDebitSales = parseFloat(openCashRegister.totalDebitSales || 0) + totalPrice;
    } else if (paymentMethod === 'credito') {
      openCashRegister.totalCreditSales = parseFloat(openCashRegister.totalCreditSales || 0) + totalPrice;
    } else if (paymentMethod === 'voucher') {
      openCashRegister.totalVoucherSales = parseFloat(openCashRegister.totalVoucherSales || 0) + totalPrice;
    }

    await openCashRegister.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Emissão de Recibo (PDF)
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

    if (!sale) {
      return res.status(404).send('Venda não encontrada');
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt_${saleId}.pdf"`);

    doc.pipe(res);
    doc.fontSize(27).text('Recibo de Venda', 200, 50);
    doc.fontSize(12).text(`ID da Venda: ${sale.id}`, 50, 100);
    doc.fontSize(12).text(`Caixa: ${sale.CashRegister.registerNumber}`, 50, 150);
    doc.fontSize(12).text(`Vendedor: ${sale.User.username}`, 50, 200);
    doc.fontSize(12).text(`Produto: ${sale.Product.name}`, 50, 250);
    doc.text(`Quantidade: ${sale.quantity}`, 50, 300);
    doc.text(`Total: R$ ${parseFloat(sale.totalPrice).toFixed(2)}`, 50, 350);

    doc.end();
  } catch (error) {
    res.status(500).send('Erro ao gerar recibo: ' + error.message);
  }
};
