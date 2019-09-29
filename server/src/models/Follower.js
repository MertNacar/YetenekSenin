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
  foreignKey: {
    name: "userID",
    allowNull: false
  }
});

FollowerModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userID",
    allowNull: false
  }
});

UserModel.hasMany(FollowerModel, {
  foreignKey: {
    name: "followerID",
    allowNull: false
  }
});

FollowerModel.belongsTo(UserModel, {
  foreignKey: {
    name: "followerID",
    allowNull: false
  }
});

module.exports = FollowerModel;
