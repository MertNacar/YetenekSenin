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
      defaultValue: false
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

StarVideoModel.hasMany(UserModel, {
  foreignKey: "userID"
});

UserModel.hasMany(StarVideoModel, {
  foreignKey: "userID"
});

VideoModel.hasMany(StarVideoModel, {
  foreignKey: "videoID"
});

StarVideoModel.hasMany(VideoModel, {
  foreignKey: "videoID"
});

module.exports = StarVideoModel;
