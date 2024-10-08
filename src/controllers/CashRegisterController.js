// Funções de Caixa
const CashRegister = require('../models/CashRegister');
const Sale = require ('../models/Sales');

// Lista todos os usuários
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

      // Verifica se a sangria é possível (se há saldo suficiente)
      if (cashRegister.openingBalance < withdrawalAmount) {
          return res.status(400).send('Saldo insuficiente para a sangria.');
      }

      // Atualiza o valor total das sangrias e o saldo de abertura
      cashRegister.totalWithdrawals += withdrawalAmount;
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
      const { registerNumber, closingBalance } = req.body;
      const cashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!cashRegister) {
          return res.status(404).send('Caixa não encontrado ou já fechado.');
      }

      cashRegister.status = 'fechado';
      cashRegister.closingBalance = closingBalance;
      await cashRegister.save();
      res.status(200).json(cashRegister);
  } catch (error) {
      res.status(500).send('Erro ao fechar caixa: ' + error.message);
  }
};

// Consulta de Saldo
exports.getCashRegisterBalance = async (req, res) => {
  try {
      const { registerNumber } = req.params;
      const cashRegister = await CashRegister.findOne({ where: { registerNumber } });
      if (!cashRegister) {
          return res.status(404).send('Caixa não encontrado.');
      }
      const balance = cashRegister.openingBalance;
      res.json({ balance });
  } catch (error) {
      res.status(500).send('Erro ao consultar saldo: ' + error.message);
  }
};

// Consulta de Vendas por Método de Pagamento
exports.getSalesByMethod = async (req, res) => {
    const { registerNumber } = req.params;

    try {
        const sales = await Sale.findAll({
            where: { cashierId: registerNumber }
        });

        let totalCashSales = 0;
        let totalPixSales = 0;
        let totalDebitSales = 0;
        let totalCreditSales = 0;
        let totalVoucherSales = 0;

        sales.forEach(sale => {
            switch (sale.paymentMethod) {
                case 'cash':
                    totalCashSales += parseFloat(sale.totalPrice);
                    break;
                case 'pix':
                    totalPixSales += parseFloat(sale.totalPrice);
                    break;
                case 'debit':
                    totalDebitSales += parseFloat(sale.totalPrice);
                    break;
                case 'credit':
                    totalCreditSales += parseFloat(sale.totalPrice);
                    break;
                case 'voucher':
                    totalVoucherSales += parseFloat(sale.totalPrice);
                    break;
                default:
                    break;
            }
        });

        res.json({
            totalCashSales: totalCashSales.toFixed(2),
            totalPixSales: totalPixSales.toFixed(2),
            totalDebitSales: totalDebitSales.toFixed(2),
            totalCreditSales: totalCreditSales.toFixed(2),
            totalVoucherSales: totalVoucherSales.toFixed(2)
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
