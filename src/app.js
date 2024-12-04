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
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'] 
  }));
  
app.use(express.json());


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
            return await operation();
        } catch (error) {
            if (error.name === 'SequelizeDatabaseError' && error.message.includes('Deadlock')) {
                retries -= 1; 
                console.warn('Deadlock detected, retrying transaction...', retries, 'retries left');
            } else {
                throw error; 
            }
        }
    }
    throw new Error('A transação falhou após novas tentativas');
};

// Função para verificar e sincronizar as tabelas
const syncTables = async () => {
    try {
        await retryTransaction(() => sequelize.sync({ alter: false }));
        console.log('Todas as tabelas foram sincronizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar tabelas:', error);
    }
};

syncTables();
