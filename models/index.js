const Sequelize = require('sequelize');
require('dotenv').config()
//bağlantı oluşturuldu.

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mssql'
  })

  //conversion date to string
  Sequelize.DATE.prototype._stringify = function _stringify(date, options) {

    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
    
  };
  module.exports = sequelize;