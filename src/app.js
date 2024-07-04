const express = require('express');
const app = express();
const usuarioRota = require('./Rotas/usuarioRotas');
const produtoRota = require('./Rotas/produtoRotas');
const pedidoRota = require('./Rotas/pedidoRotas');

app.use('/api', usuarioRota);
app.use('/api', produtoRota);
app.use('/api', pedidoRota);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});















// 

