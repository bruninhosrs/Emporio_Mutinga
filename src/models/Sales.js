//Vendas de Caixa
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Sale extends Model {}

Sale.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cashierId: {
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
    }
}, {
    sequelize,
    modelName: 'sale'
});

module.exports = Sale;
