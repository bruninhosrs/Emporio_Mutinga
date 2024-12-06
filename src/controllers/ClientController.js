const Client = require("../models/Client");

// Listar todos os clientes
exports.listAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).send(`Erro ao buscar clientes: ${error.message}`);
  }
};

// Buscar cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).send('Cliente não encontrado.');
    }

    res.json(client);
  } catch (error) {
    res.status(500).send(`Erro ao buscar cliente: ${error.message}`);
  }
};

// Criar novo cliente
exports.createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).send(`Erro ao criar cliente: ${error.message}`);
  }
};

// Atualizar cliente
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Client.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).send('Cliente não encontrado.');
    }

    const updatedClient = await Client.findByPk(id);
    res.json(updatedClient);
  } catch (error) {
    res.status(500).send(`Erro ao atualizar cliente: ${error.message}`);
  }
};

// Deletar cliente
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send('Cliente não encontrado.');
    }

    res.status(200).send('Cliente deletado com sucesso.');
  } catch (error) {
    res.status(500).send(`Erro ao deletar cliente: ${error.message}`);
  }
};
