const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

const User = sequelize.define('User', {
  username: {
        type: DataTypes.STRING, 
        unique: true ,
        trim:true
  },
  password: {
      type: DataTypes.STRING,
      require:true
  },
  createdAt: {
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
  },
});

module.exports = User;


