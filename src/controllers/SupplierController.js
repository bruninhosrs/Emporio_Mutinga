const Supplier = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Supplier.update(req.body, { where: { id } });
        if (updated) {
            const updatedSupplier = await Supplier.findByPk(id);
            res.json(updatedSupplier);
        } else {
            res.status(404).send('Fornecedor não encontrado!');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Supplier.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send("Fornecedor deletado com sucesso!");
        } else {
            res.status(404).send("Fornecedor não encontrado!");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
