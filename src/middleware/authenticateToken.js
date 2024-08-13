// Arquivo para proteger as rotas!
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here';

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
      if (!roles.includes(req.user.role))
          return res.status(403).send('Você não tem permissão para acessar este recurso');
      next(); // Se o usuário tem a função necessária, prossegue para a próxima função no pipeline
  };
};

module.exports = { authenticateToken, authorizeRole };