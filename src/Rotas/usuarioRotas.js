// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ajuste o caminho conforme sua estrutura

// Definir rotas
router.get('/', (req, res) => {
  res.send('List of users');
});

// CREATE: Adicionar um novo usuário
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ: Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado!');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE: Atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [ updated ] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Deletar um usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(204).send("Sucesso, usuário deletado!");
    } else {
      res.status(404).send("Usuário não encontrado!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



// // Suponha que User é o modelo do Sequelize para a tabela de usuários
// const User = require('../models/User'); // Ajuste o caminho conforme necessário

// // Função para verificar se o usuário existe
// async function checkUserExists(email) {
//   try {
//     const user = await User.findOne({ where: { email: email } });
//     return user ? true : false;
//   } catch (error) {
//     console.error("Erro ao verificar o usuário:", error);
//     throw error;
//   }
// }
