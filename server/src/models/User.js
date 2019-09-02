const sequelize = require("./index");
const Sequelize = require("sequelize");
const SubTalentModel = require("./SubTalent");
const TalentModel = require("./Talent");
const CityModel = require("./City");

const UserModel = sequelize.define(
  "tblUser",
  {
    userID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    surname: {
      type: Sequelize.STRING,
      allowNull: false
    },

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

    phone: Sequelize.STRING,

    aboutMe: Sequelize.STRING,

    birthday: {
      type: Sequelize.DATE,
      allowNull: false
    },

    profilePhoto: Sequelize.STRING,

    socialMedia: Sequelize.STRING,

    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

SubTalentModel.hasMany(UserModel, {
  foreignKey: "fSubTalentID"
});

UserModel.belongsTo(SubTalentModel, {
  foreignKey: "fSubTalentID"
});

CityModel.hasMany(UserModel, {
  foreignKey: "fCity"
});

UserModel.belongsTo(CityModel, {
  foreignKey: "fCity"
});

TalentModel.hasMany(UserModel, {
  foreignKey: "fTalentID"
});

UserModel.belongsTo(TalentModel, {
  foreignKey: "fTalentID"
});

module.exports = UserModel;
