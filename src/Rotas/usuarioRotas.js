const express = require('express');
const router = express.Router();

// Definir rotas
router.get('/users', (req, res) => {
    res.send('List of users');
  });
  
  // Exportar o roteador
  module.exports = router;