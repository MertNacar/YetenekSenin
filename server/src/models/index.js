const Sequelize = require("sequelize");
const config = require("config");
//bağlantı oluşturuldu.

const sequelize = new Sequelize(
  config.database.dbName,
  config.database.user.name,
  config.database.user.password,
  {
    dialect: "mssql"
  }
);

//conversion date to string
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Bağlantı başarıyla kuruldu.");
  })
  .catch(err => {
    console.error("Bağlanılamıyor:", err);
  });

module.exports = sequelize;
