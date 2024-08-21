const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const router = require('../Rotas/produtoRotas');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
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
    },
    barcode: {
        type: DataTypes.STRING,  
        unique: true,            // Garante que o código de barras seja único
        allowNull: true          // Pode ser nulo, se não todos os produtos precisam de um código de barras
    },
    category: {
        type: DataTypes.STRING,  
        allowNull: true          // Pode ser nulo, se categorias não são obrigatórias
    }
}, {
    sequelize,
    modelName: 'product',
    timestamps: false
});

module.exports = Product;