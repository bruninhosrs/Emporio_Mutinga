const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product'); 
//const router = require('../Rotas/pedidoRotas');

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
Order.belongsTo(User); // Configura uma relação 'muitos para um' com User
Order.belongsTo(Product); // Configura uma relação 'muitos para um' com Product

module.exports = Order;
