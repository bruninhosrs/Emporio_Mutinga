const User = require('../models/User');
const bcrypt = require('../utils/auth');
const jwt = require('jsonwebtoken');

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
    const hashedPassword = await bcrypt.hashPassword(req.body.password);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'atendente' // Aqui ele define no autoámtico que a função do usuário é 'ATENDENTE'
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!", userId: newUser.id });
  } catch (error) {
      res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

// Area de Login
exports.login = async (req, res) => {
  try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) return res.status(404).send('Usuário não encontrado');

      // Verificação da senha
      const validPassword = await bcrypt.comparePassword(req.body.password, user.password);
      if (!validPassword) return res.status(401).send('Senha incorreta');

      // Geração do token JWT
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
      res.json({ message: "Login bem-sucedido!", token: token });
  } catch (error) {
      res.status(500).json({ message: "Erro ao efetuar login", error: error.message });
  }
};

// Retorna detalhes do usuário autenticado
exports.getUserDetails = async (req, res) => {
  try {
      const user = await User.findByPk(req.user.userId); // 'req.user.userId' vem do middleware de autenticação
      if (!user) return res.status(404).send('Usuário não encontrado');

      res.json({ username: user.username, email: user.email, role: user.role });
  } catch (error) {
      res.status(500).json({ message: "Erro ao obter detalhes do usuário", error: error.message });
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
