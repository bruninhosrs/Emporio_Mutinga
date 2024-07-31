const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Supplier extends Model {}

Supplier.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fantasyName: {
        type: DataTypes.STRING
    },
    cnpj: {
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
    contactName2: DataTypes.STRING,
    contactEmail2: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    contactPhone2: DataTypes.STRING,
    paymentConditions: DataTypes.TEXT,
    purchaseHistory: DataTypes.TEXT,
    supplierRating: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'supplier'
});

module.exports = Supplier;