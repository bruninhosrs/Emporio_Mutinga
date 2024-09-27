const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product'); 

class Order extends Model {}

Order.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendente', // Valor padrão continua sendo 'pendente'
        validate: {
            isIn: {
                args: [['pendente', 'concluída', 'cancelada',]],
                msg: "Status do pedido não encontrado!" // Mensagem personalizada para erros de validação
            }
        }
    }
    
}, {
    sequelize,
    modelName: 'order',
    timestamps: false
});

// Relacionamentos
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Relaciona o pedido com o usuário
Order.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' }); // Relaciona o pedido com o produto

module.exports = Order;
