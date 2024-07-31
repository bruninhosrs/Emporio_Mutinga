const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Client extends Model {}

Client.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fantasyName: DataTypes.STRING,
    cpfCnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: DataTypes.STRING,
    contactName1: DataTypes.STRING,
    contactEmail1: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    contactPhone1: DataTypes.STRING,
    purchaseHistory: DataTypes.TEXT,
    creditLimit: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    sequelize,
    modelName: 'client'
});

module.exports = Client;
