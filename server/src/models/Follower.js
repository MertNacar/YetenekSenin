const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");

const FollowerModel = sequelize.define(
  "tblFollower",
  {
    followID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    indexes: [
      { unique: true, fields: ["fuserID", "fFollowerID"], name: "FollowsPK" }
    ],

    freezeTableName: true
  }
);

FollowerModel.hasMany(UserModel, {
  foreignKey: "fuserID"
});

UserModel.hasMany(FollowerModel, {
  foreignKey: "fuserID"
});

FollowerModel.hasMany(UserModel, {
  foreignKey: "fFollowerID"
});

UserModel.hasMany(FollowerModel, {
  foreignKey: "fFollowerID"
});

module.exports = FollowerModel;
