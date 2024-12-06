// Arquivo para proteger as rotas!
const jwt = require('jsonwebtoken');
const secretKey = '123456';

// Middleware para autenticar o token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho

  if (!token) {
    console.log('Erro: Token não fornecido.');
    return res.status(401).send('Token de autenticação não fornecido.');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log('Erro ao verificar o token:', err.message);
      return res.status(403).send('Token inválido ou expirado.');
    }

    req.user = user; // Adiciona as informações do usuário autenticado ao objeto `req`
    console.log('Usuário autenticado:', user); // Log para depuração
    next();
  });
};

// Middleware para autorizar acesso com base nas funções
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.log('Erro: Função não definida no token.');
      return res.status(403).send('Acesso negado. Função não definida.');
    }

    const userRole = req.user.role.toLowerCase(); // Função do usuário
    const allowedRoles = roles.map((role) => role.toLowerCase()); // Funções permitidas

    console.log('Função do Token:', userRole);
    console.log('Funções permitidas:', allowedRoles);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send('Acesso negado. Permissão insuficiente.');
    }

    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
