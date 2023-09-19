 const  Sequelize= require('../db/sequelize'); 
const DataTypes =require('sequelize');
const producto = Sequelize.define('productos', {
    idProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false 
});
module.exports = producto;
 