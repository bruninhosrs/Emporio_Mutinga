// Criação de Caixa
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CashRegister extends Model {}

CashRegister.init({
    registerNumber: { // Identificador do número do caixa da loja
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    storeId: { //Identificador de qual loja o caixa pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    openingBalance: { //Saldo inicial do caixa, após ele ser aberto
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    closingBalance: { //Saldo final do caixa, após ele ser fechado
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    cashOutflow: {  // Sangria de caixa
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'aberto'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    closedAt: { //Data e horário do fechamento
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'cashRegister',
    timestamps: false
});

module.exports = CashRegister;

