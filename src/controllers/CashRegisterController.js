// Funções de Caixa
const CashRegister = require('../models/CashRegister');

// Abre um novo caixa
exports.openCashRegister = async (req, res) => {
    try {
      const { registerNumber, storeId, openingBalance } = req.body;
  
      // Verificar se já existe um caixa aberto com o mesmo número de caixa
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, storeId, status: 'aberto' } });
      if (openCashRegister) {
        return res.status(400).json({ message: `Já existe um caixa aberto para o número ${registerNumber}.` });
      }
  
      // Criar novo caixa
      const newCashRegister = await CashRegister.create({ registerNumber, storeId, openingBalance });
      res.status(201).json(newCashRegister);
    } catch (error) {
      res.status(500).send(`Erro ao abrir caixa: ${error.message}`);
    }
  };

// Fecha o caixa
exports.closeCashRegister = async (req, res) => {
    try {
      const { registerNumber } = req.params;
      const { closingBalance } = req.body;
  
      // Verificar se há um caixa aberto com o número de caixa específico
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!openCashRegister) {
        return res.status(400).json({ message: `Não há caixa aberto para o número ${registerNumber}.` });
      }
  
      // Fechar o caixa
      openCashRegister.closingBalance = closingBalance;
      openCashRegister.status = 'fechado';
      openCashRegister.closedAt = new Date();
      await openCashRegister.save();
  
      res.status(200).json(openCashRegister);
    } catch (error) {
      res.status(500).send(`Erro ao fechar caixa: ${error.message}`);
    }
  };
  
  // Adiciona uma entrada no caixa
exports.addEntry = async (req, res) => {
    try {
      const { registerNumber } = req.params;
      const { amount } = req.body;
  
      // Verificar se há um caixa aberto com o número de caixa
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!openCashRegister) {
        return res.status(400).json({ message: `Não há caixa aberto para o número ${registerNumber}.` });
      }
  
      // Adicionar o valor ao saldo do caixa
      openCashRegister.openingBalance += parseFloat(amount);
      await openCashRegister.save();
  
      res.status(200).json(openCashRegister);
    } catch (error) {
      res.status(500).send(`Erro ao adicionar entrada: ${error.message}`);
    }
  };
  
  // Adiciona uma saída no caixa
  exports.addExit = async (req, res) => {
    try {
      const { registerNumber } = req.params;
      const { amount } = req.body;
  
      // Verificar se há um caixa aberto com o número de caixa
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!openCashRegister) {
        return res.status(400).json({ message: `Não há caixa aberto para o número ${registerNumber}.` });
      }
  
      // Subtrair o valor do saldo do caixa
      openCashRegister.openingBalance -= parseFloat(amount);
      await openCashRegister.save();
  
      res.status(200).json(openCashRegister);
    } catch (error) {
      res.status(500).send(`Erro ao registrar saída: ${error.message}`);
    }
  };
  
  // Verifica o saldo do caixa
exports.getBalance = async (req, res) => {
    try {
      const { registerNumber } = req.params;
  
      // Verificar se há um caixa aberto com o número de caixa
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!openCashRegister) {
        return res.status(400).json({ message: `Não há caixa aberto para o número ${registerNumber}.` });
      }
  
      res.status(200).json({ balance: openCashRegister.openingBalance });
    } catch (error) {
      res.status(500).send(`Erro ao buscar saldo: ${error.message}`);
    }
  };

  // Registrar sangria de caixa
exports.cashOut = async (req, res) => {
    try {
      const { registerNumber } = req.params;
      const { amount } = req.body;
  
      // Verificar se há um caixa aberto com o número de caixa específico
      const openCashRegister = await CashRegister.findOne({ where: { registerNumber, status: 'aberto' } });
      if (!openCashRegister) {
        return res.status(400).json({ message: `Não há caixa aberto para o número ${registerNumber}.` });
      }
  
      // Subtrair o valor do saldo e adicionar ao total de sangrias (cashOutflow)
      openCashRegister.openingBalance -= parseFloat(amount);
      openCashRegister.cashOutflow += parseFloat(amount);  // Atualizar a sangria total
      await openCashRegister.save();
  
      res.status(200).json(openCashRegister);
    } catch (error) {
      res.status(500).send(`Erro ao registrar sangria: ${error.message}`);
    }
  };
  