const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Bearer Token

  if (token == null) return res.sendStatus(401);  // Se não houver token, retorna erro 401

  jwt.verify(token, 123456, (err, user) => {
    if (err) return res.sendStatus(403);  // Se o token for inválido ou expirado, retorna erro 403

    req.user = user;  // Se o token for válido, anexa os dados do usuário ao objeto request
    next();  // Chama o próximo middleware
  });
}

module.exports = authenticateToken;