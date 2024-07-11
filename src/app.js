const express = require('express');
const app = express();
const userRoutes = require('./Rotas/usuarioRotas');
const productRoutes = require('./Rotas/produtoRotas');
const orderRoutes = require('./Rotas/pedidoRotas');

app.use(express.json()); // Para analisar JSON no corpo da requisição

// Criaçao de rotas, usuarios, pedidos e produtos
app.use('/users', userRoutes);
//app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);




const port = 3000;
//app.listen(port, () => {
//    console.log(`Server running on port ${port}`);
//});

 app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });



/* TESTES PARA CRIAÇÃO DE TABELAS NO BANCO DE DADOS

const sequelize = require('./config/database'); // Ajuste o caminho conforme necessário
const User = require('./models/User'); // Ajuste os modelos conforme necessário
//const Product = require('./models/Product');
//const Order = require('./models/Order');

// Sincroniza todos os modelos com o banco de dados
sequelize.sync({ force: false }) // 'force: true' faria drop das tabelas antes de criar
  .then(() => {
    console.log("Tabelas criadas com sucesso.");
  })
  .catch(error => {
    console.error("Erro ao criar tabelas:", error);
  });
*/