require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Supplier = require ('./models/Supplier');
const Client = require('./models/Client');
const CashRegister = require('./models/CashRegister');
const Sale = require('./models/Sales');

app.use(cors({
    origin: 'http://localhost:3001', // Origem permitida (onde o frontend está rodando)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Authorization', 'Content-Type'] // Headers permitidos
  }));
  
app.use(express.json()); // Para analisar JSON no corpo da requisição


app.use('/users', require('./Rotas/usuarioRotas'));
app.use('/products', require('./Rotas/produtoRotas'));
app.use('/orders', require('./Rotas/pedidoRotas'));
app.use('/suppliers', require('./Rotas/fornecedorRotas'));
app.use('/clients', require('./Rotas/clienteRotas'));
app.use('/cashRegisters', require('./Rotas/caixaRotas'));
app.use('/sales', require('./Rotas/vendasRotas'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Função de re-tentativa
const retryTransaction = async (operation, retries = 3) => {
    while (retries) {
        try {
            return await operation(); // Tenta executar a operação passada
        } catch (error) {
            if (error.name === 'SequelizeDatabaseError' && error.message.includes('Deadlock')) {
                retries -= 1; // Reduz a quantidade de tentativas
                console.warn('Deadlock detected, retrying transaction...', retries, 'retries left');
            } else {
                throw error; // Se não for deadlock, lança o erro
            }
        }
    }
    throw new Error('A transação falhou após novas tentativas');
};

// Função para verificar e sincronizar as tabelas
const syncTables = async () => {
    try {
        await retryTransaction(() => sequelize.sync({ alter: true })); // Usando a lógica de re-tentativa
        console.log('Todas as tabelas foram sincronizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar tabelas:', error);
    }
};

// Função para verificar e sincronizar tabela
// const syncTable = async (model, tableName) => {
//     const schemas = await sequelize.showAllSchemas();
//     if (schemas.includes(tableName)) {
//         console.log(`A tabela ${tableName} já existe.`);
//     } else {
//         try {
//             await sequelize.sync({ alter: true });  
//             console.log(`Tabelas criadas com sucesso.`);
//         } catch (error) {
//             console.error(`Erro ao criar tabelas: ${error}`);
//         }
//     }
// };

// Sincronizar tabelas
syncTables();
// syncTable(User, 'users');
// syncTable(Product, 'products');
// syncTable(Order, 'orders');
// syncTable(Supplier, 'supplier');
// syncTable(Client, 'client');
// syncTable(CashRegister, 'cashRegister');
// syncTable(Sale, 'sale');