// Arquivo usado apenas os login de usuário
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your_secret_key_here';

// Gerar token JWT
exports.generateToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};
// Esta função cria um token JWT que contém o ID e o nome de usuário, que expira em 1 hora.

// Hashear senha
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Verificar senha
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
