const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  },
  role:{
    type:DataTypes.STRING,
    defaultValue:'ATENDENTE'
  }
  
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;
