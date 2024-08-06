// Funções de Caixa
const CashRegister = require('../models/CashRegister');

exports.createCashRegister = async (req, res) => {
    try {
        const cashRegister = await CashRegister.create(req.body);
        res.status(201).json(cashRegister);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCashRegister = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await CashRegister.update(req.body, { where: { id } });
        if (updated) {
            const updatedCashRegister = await CashRegister.findByPk(id);
            res.json(updatedCashRegister);
        } else {
            res.status(404).send('Caixa não encontrado!');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCashRegister = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CashRegister.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send("Caixa deletado com sucesso!");
        } else {
            res.status(404).send("Caixa não encontrado!");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listAllCashRegisters = async (req, res) => {
    try {
        const cashRegisters = await CashRegister.findAll();
        res.json(cashRegisters);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
