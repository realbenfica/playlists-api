const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_confirmation: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  timestamps: false,
  tableName: 'users'
})

module.exports = User