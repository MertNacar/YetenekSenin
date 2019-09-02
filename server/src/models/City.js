const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");

const CityModel = sequelize.define(
  "tblCity",
  {
    code: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    city: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = CityModel;
