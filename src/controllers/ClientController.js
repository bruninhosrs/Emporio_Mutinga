const Client = require('../models/Client');

exports.createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Client.update(req.body, { where: { id } });
        if (updated) {
            const updatedClient = await Client.findByPk(id);
            res.json(updatedClient);
        } else {
            res.status(404).send('Cliente não encontrado!');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Client.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send("Cliente deletado com sucesso!");
        } else {
            res.status(404).send("Cliente não encontrado!");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
