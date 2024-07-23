const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

app.use(express.json()); // Para analisar JSON no corpo da requisição

app.use('/users', require('./Rotas/usuarioRotas'));
app.use('/products', require('./Rotas/produtoRotas'));
app.use('/orders', require('./Rotas/pedidoRotas'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Função para verificar e sincronizar tabela
const syncTable = async (model, tableName) => {
    const schemas = await sequelize.showAllSchemas();
    if (schemas.includes(tableName)) {
        console.log(`A tabela ${tableName} já existe.`);
    } else {
        try {
            await sequelize.sync({ force: false });
            console.log(`Tabelas criadas com sucesso.`);
        } catch (error) {
            console.error(`Erro ao criar tabelas: ${error}`);
        }
    }
};

// Sincronizar tabelas
syncTable(User, 'users');
syncTable(Product, 'products');
syncTable(Order, 'orders');

module.exports = app;