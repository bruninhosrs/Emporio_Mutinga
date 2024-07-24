const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const router = require('../Rotas/produtoRotas');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'product',
    timestamps: false  // opcional, dependendo se você quer ou não campos de timestamps
});

module.exports = Product;