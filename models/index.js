const Sequelize = require('sequelize');
require('dotenv').config()
//bağlantı oluşturuldu.

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mssql'
  })
  
  module.exports = sequelize;