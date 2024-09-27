const Client = require('../models/Client');

// Lista todos os usuários
exports.listAllClients = async (req, res) => {
    try {
      const client = await Client.findAll();
      res.json(client);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

// Busca um cliente pelo ID
exports.getClientById = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).send('Cliente não encontrado!');
      }
      res.json(client);
    } catch (error) {
      res.status(500).send(`Erro ao buscar cliente: ${error.message}`);
    }
  };

// Criar um cliente
exports.createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Busca um cliente pelo ID
exports.getClientById = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).send('Cliente não encontrado!');
      }
      res.json(client);
    } catch (error) {
      res.status(500).send(`Erro ao buscar cliente: ${error.message}`);
    }
  };

  // Alterar um cliente
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

// Deletar um cliente
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
