const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const router = require('../Rotas/usuarioRotas');

class User extends Model {}

User.init({
  
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false, 
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