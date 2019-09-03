const sequelize = require("./index");
const Sequelize = require("sequelize");

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
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = CityModel;
