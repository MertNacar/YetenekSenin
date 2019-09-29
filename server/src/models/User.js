const sequelize = require("./index");
const Sequelize = require("sequelize");
const CityModel = require("./City");

const UserModel = sequelize.define(
  "tblUser",
  {
    userID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    firstname: Sequelize.STRING,

    surname: Sequelize.STRING,

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    gender: {
      type: Sequelize.CHAR,
      defaultValue: "u"
    },

    allStars: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    allVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },

    aboutMe: Sequelize.STRING,

    birthday: Sequelize.DATE,


    profilePhoto: Sequelize.STRING,

    socialMedia: Sequelize.STRING,

    email: Sequelize.STRING,
  },
  {
    freezeTableName: true
  }
);

CityModel.hasMany(UserModel, {
  foreignKey: "fCity"
});

UserModel.belongsTo(CityModel, {
  foreignKey: "fCity"
});

module.exports = UserModel;
