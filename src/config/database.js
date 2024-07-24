const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('EmporioMutinga', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = sequelize;
