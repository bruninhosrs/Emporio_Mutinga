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


/*
const express = require('express');
const app = express();
const userRoutes = require('./Rotas/usuarioRotas'); // Rotas criadas com CRUD basico
const productRoutes = require('./Rotas/produtoRotas'); // Rotas criadas com CRUD basico
const orderRoutes = require('./Rotas/pedidoRotas'); // Rotas criadas com CRUD basico

app.use(express.json()); // Para analisar JSON no corpo da requisição

// Criação de rotas, usuarios, pedidos e produtos
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


const port = 3000;

 app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });



// TESTES PARA CRIAÇÃO DE TABELAS NO BANCO DE DADOS

// Sincroniza todos os modelos com o banco de dados
const sequelize = require('./config/database'); // essa linha de código importa o Sequelize configurado no projeto na pasta 'src/config/database.js'
const User = require('./models/User'); // importa o modelo 'User' definido usando o Sequelize. nesse modelo representa uma tabela no banco de dados. pasta 'src/models/User.js'
const Product = require('./models/Product'); // importa o modelo 'Product' definido usando o Sequelize. nesse modelo representa uma tabela no banco de dados. pasta 'src/models/Product.js'
const Order = require('./models/Order'); // importa o modelo 'Order' definido usando o Sequelize. nesse modelo representa uma tabela no banco de dados. pasta 'src/models/Order.js'

//User
sequelize.showAllSchemas().then((schemas) => {
  if (schemas.includes('users')) {  // showAllSchemas(): Este método retorna uma lista de todos os esquemas (tabelas) existentes no banco de dados. Assume que 'users' é o nome da tabela para o modelo User
    console.log('A tabela já existe');
  } else {
    sequelize.sync({ force: false }) //comando sincroniza os modelos definidos com o BD. 
    // Isso significa que o Sequelize vai verificar se existe a tabela desses modelos, caso existá ele não vai exclui-las por causa do parametro { force: false } se trocassemos o 
    // false pelo 'true' o Sequelize exluirá as tabelas existentes e as recriará, ocasionando a perda de dados existentes.

      .then(() => {
        console.log("Tabelas criadas com sucesso.");
      })
      .catch(error => {
        console.error("Erro ao criar tabela:", error);
      });
  }
});

//Produto
sequelize.showAllSchemas().then((schemas) => {
  if (schemas.includes('products')) {  
    console.log('A tabela já existe');
  } else {
    sequelize.sync({ force: false })

      .then(() => {
        console.log("Tabelas criadas com sucesso.");
      })
      .catch(error => {
        console.error("Erro ao criar tabela:", error);
      });
  }
});

//Order
sequelize.showAllSchemas().then((schemas) => {
  if (schemas.includes('order')) { 
    console.log('A tabela já existe');
  } else {
    sequelize.sync({ force: false })

      .then(() => {
        console.log("Tabelas criadas com sucesso.");
      })
      .catch(error => {
        console.error("Erro ao criar tabelas:", error);
      });
  }
});
*/