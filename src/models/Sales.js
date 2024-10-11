//Vendas de Caixa
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const CashRegister = require('./CashRegister');

class Sale extends Model {}

Sale.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registerNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM('dinheiro', 'pix', 'debito', 'credito', 'voucher'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'sale'
});

// Relacionamentos
Sale.belongsTo(User, {foreignKey: 'userId', as: 'User'});  // Relaciona Sale com User
Sale.belongsTo(Product, {foreignKey: 'productId', as: 'Product'});  // Relaciona Sale com Product
Sale.belongsTo(CashRegister, { foreignKey: 'registerNumber', targetKey: 'registerNumber', as: 'CashRegister' });  // Relaciona Sale com CashRegister

module.exports = Sale;