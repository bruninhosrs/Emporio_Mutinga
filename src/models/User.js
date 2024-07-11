const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua estrutura
const router = require('../Rotas/usuarioRotas');

class User extends Model {}

User.init({
  // id:{
  //   type: DataTypes.INTEGER, 
  //   autoIncrement, 
  //   allowNull: false
  // },cre

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    isEmail: true
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;
