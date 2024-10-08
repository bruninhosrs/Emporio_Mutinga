// Criação de Relatório do Caixa
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CashRegister extends Model {}

CashRegister.init({
    registerNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Definindo como chave primária
        autoIncrement: true
    },
    openingBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    closingBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    totalCashSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalPixSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalDebitSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalCreditSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalVoucherSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalWithdrawals: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.ENUM('aberto', 'fechado'),
        allowNull: false,
        defaultValue: 'aberto'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    }
}, {
    sequelize,
    modelName: 'cashRegister',
    timestamps: true
});

module.exports = CashRegister;
