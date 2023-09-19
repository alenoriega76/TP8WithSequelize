const Sequelize = require('../db/sequelize');
 const { DataTypes } = require('sequelize'); 

const usuario = Sequelize.define('usuarios', {
  idUser: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fec_nac: {
    type: DataTypes.DATE
  }
},{
  timestamps: false 
});

module.exports = usuario;
 