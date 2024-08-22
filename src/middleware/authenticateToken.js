// Arquivo para proteger as rotas!
const jwt = require('jsonwebtoken');
const secretKey = '123456';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extrai o token do cabeçalho de autorização

  if (!token) return res.sendStatus(401); // Se não há token, retorna erro 401 (Não Autorizado)

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token é inválido, retorna erro 403 (Proibido)
    req.user = user; // Adiciona os dados do usuário ao objeto de requisição
    next(); // Passa para o próximo middleware ou rota
  });
};

// Verifica se o usuário tem uma das funções para acessar a rota
const authorizeRole = (roles) => {
  return (req, res, next) => {
    console.log('Função do Token:', req.user.role);
    console.log('Funções permitidas:', roles);
    const roleNormalized = req.user.role.toLowerCase();
    const rolesNormalized = roles.map(role => role.toLowerCase());

    if (!rolesNormalized.includes(roleNormalized)) {
      return res.status(403).send('Acesso negado. Permissão insuficiente.');
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };