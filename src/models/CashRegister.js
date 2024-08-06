// Criação de Caixa
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CashRegister extends Model {}

CashRegister.init({
    numCaixa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    location: DataTypes.STRING,
    hostname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ativo'
    },
    responsible: DataTypes.STRING
}, {
    sequelize,
    modelName: 'cashRegister'
});

module.exports = CashRegister;
