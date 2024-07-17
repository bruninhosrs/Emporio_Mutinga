const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extrai o token do cabeçalho de autorização
  if (!token) return res.sendStatus(401); // Se não há token, retorna erro 401 (Não Autorizado)

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token é inválido, retorna erro 403 (Proibido)
    req.user = user; // Se válido, o payload do token é adicionado à requisição
    next(); // Passa para o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
