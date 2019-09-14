const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");

const FollowerModel = sequelize.define(
  "tblFollower",

  {
    followID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    isFollow: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },

    isBlock: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    indexes: [
      {
        name: "FollowsPK",
        unique: true,
        fields: ["userID", "followerID"]
      }
    ],

    freezeTableName: true
  }
);

UserModel.hasMany(FollowerModel, {
  foreignKey: "userID"
});

UserModel.hasMany(FollowerModel, {
  foreignKey: "followerID"
});

module.exports = FollowerModel;
