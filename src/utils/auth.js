const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your_secret_key_here'; // Use uma chave secreta forte e guarde-a segura, preferencialmente em variáveis de ambiente.

// Gerar token JWT
exports.generateToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};
// Esta função cria um token JWT que contém o ID e o nome de usuário, que expira em 1 hora.

// Hashear senha
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
// Esta função usa bcrypt para hashear senhas antes de armazená-las no banco de dados. O "10" é o número de rounds de salting.

// Verificar senha
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
// Esta função verifica se a senha fornecida, quando hasheada, corresponde ao hash armazenado.