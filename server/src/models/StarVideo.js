const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");
const VideoModel = require("./Video");

const StarVideoModel = sequelize.define(
  "tblStarVideo",

  {
    starVideoID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    isLike: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    indexes: [
      {
        name: "StarsPK",
        unique: true,
        fields: ["userID", "videoID"]
      }
    ],

    freezeTableName: true
  }
);

UserModel.hasMany(StarVideoModel, {
  foreignKey: {
    name: "userID",
    allowNull: false
  }
});

VideoModel.hasMany(StarVideoModel, {
  foreignKey: {
    name: "videoID",
    allowNull: false
  }
});

module.exports = StarVideoModel;
