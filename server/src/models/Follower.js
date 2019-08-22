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

FollowerModel.hasMany(UserModel, {
  foreignKey: "userID"
});

UserModel.hasMany(FollowerModel, {
  foreignKey: "userID"
});

FollowerModel.hasMany(UserModel, {
  foreignKey: "followerID"
});

UserModel.hasMany(FollowerModel, {
  foreignKey: "followerID"
});

module.exports = FollowerModel;
