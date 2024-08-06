const User = require('../models/User');
const authUtils = require('../utils/auth');

// Lista todos os usuários
exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Cria um novo usuário
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await authUtils.hashPassword(req.body.password);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    res.status(201).json({ userId: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Area de Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await authUtils.comparePassword(req.body.password, user.password))) {
      return res.status(401).send('Autenticação falhou!');
    }
    const token = authUtils.generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualiza um usuário existente
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).send('Usuário não encontrado!');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deleta um usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send("Usuário deletado com sucesso!");
    } else {
      res.status(404).send("Usuário não encontrado!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
