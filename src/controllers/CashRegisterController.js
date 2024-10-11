// Funções de Caixa
const CashRegister = require('../models/CashRegister');
const Sale = require ('../models/Sales');

// Lista todos os caixas
exports.listAllCash = async (req, res) => {
  try {
    const cashregister = await CashRegister.findAll();
    res.json(cashregister);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Sangria de Caixa (retirada de dinheiro)
exports.withdrawFromCashRegister = async (req, res) => {
  try {
    const { registerNumber, withdrawalAmount } = req.body;

    const cashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
    if (!cashRegister) {
      return res.status(404).send('Caixa não encontrado ou já fechado.');
    }

    // Verifica se há saldo suficiente para a sangria
    if (cashRegister.openingBalance < withdrawalAmount) {
      return res.status(400).send('Saldo insuficiente para a sangria.');
    }

    // Atualiza o valor total das sangrias e o saldo de abertura
    cashRegister.totalWithdrawals = parseFloat(cashRegister.totalWithdrawals || 0) + withdrawalAmount;
    cashRegister.openingBalance -= withdrawalAmount;

    await cashRegister.save();
    res.status(200).json({ message: 'Sangria realizada com sucesso', cashRegister });
  } catch (error) {
    res.status(500).send('Erro ao realizar sangria: ' + error.message);
  }
};

// Abertura de Caixa
exports.openCashRegister = async (req, res) => {
  try {
    const { registerNumber, openingBalance } = req.body;
    const newCashRegister = await CashRegister.create({
      registerNumber,
      openingBalance,
      status: 'aberto'
    });
    res.status(201).json(newCashRegister);
  } catch (error) {
    res.status(500).send('Erro ao abrir caixa: ' + error.message);
  }
};

// Fechamento de Caixa
exports.closeCashRegister = async (req, res) => {
  try {
    const { registerNumber } = req.params;

    const cashRegister = await CashRegister.findOne({
      where: { registerNumber, status: 'aberto' }
    });

    if (!cashRegister) {
      return res.status(400).send('Caixa não encontrado ou já está fechado.');
    }

    const closingBalance = parseFloat(cashRegister.openingBalance) + 
                           parseFloat(cashRegister.totalCashSales || 0) + 
                           parseFloat(cashRegister.totalPixSales || 0) + 
                           parseFloat(cashRegister.totalDebitSales || 0) + 
                           parseFloat(cashRegister.totalCreditSales || 0) + 
                           parseFloat(cashRegister.totalVoucherSales || 0) - 
                           parseFloat(cashRegister.totalWithdrawals || 0);

    cashRegister.closingBalance = closingBalance;
    cashRegister.status = 'fechado';
    await cashRegister.save();

    res.status(200).json({
      message: 'Caixa fechado com sucesso.',
      closingBalance: closingBalance
    });
  } catch (error) {
    res.status(500).send('Erro ao fechar o caixa: ' + error.message);
  }
};

// Consulta de Saldo do Caixa
exports.getCashRegisterBalance = async (req, res) => {
  try {
    const { id } = req.params;

    const cashRegister = await CashRegister.findOne({
      where: { registerNumber: id }
    });

    if (!cashRegister) {
      return res.status(404).json({ message: 'Caixa não encontrado.' });
    }

    const balance = parseFloat(cashRegister.openingBalance) + 
                    parseFloat(cashRegister.totalCashSales || 0) + 
                    parseFloat(cashRegister.totalPixSales || 0) + 
                    parseFloat(cashRegister.totalDebitSales || 0) + 
                    parseFloat(cashRegister.totalCreditSales || 0) + 
                    parseFloat(cashRegister.totalVoucherSales || 0);

    res.status(200).json({ balance: balance.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar saldo.', error: error.message });
  }
};

// Consulta de Vendas por Método de Pagamento
exports.getSalesByMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const cashRegister = await CashRegister.findOne({
      where: { registerNumber: id }
    });

    if (!cashRegister) {
      return res.status(404).json({ message: 'Caixa não encontrado.' });
    }

    res.status(200).json({
      totalCashSales: cashRegister.totalCashSales || "0.00",
      totalPixSales: cashRegister.totalPixSales || "0.00",
      totalDebitSales: cashRegister.totalDebitSales || "0.00",
      totalCreditSales: cashRegister.totalCreditSales || "0.00",
      totalVoucherSales: cashRegister.totalVoucherSales || "0.00"
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar os métodos de pagamento.', error: error.message });
  }
};
