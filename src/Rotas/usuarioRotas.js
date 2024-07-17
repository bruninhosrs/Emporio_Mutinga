const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const authUtils = require('../utils/auth');

// CREATE: Adicionar um novo usuário
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await authUtils.hashPassword(req.body.password);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ userId: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await authUtils.comparePassword(req.body.password, user.password))) {
      return res.status(401).send('Authentication failed');
    }
    const token = authUtils.generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
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
