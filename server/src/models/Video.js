const sequelize = require("./index");
const Sequelize = require("sequelize");

const VideoModel = sequelize.define(
  "tblVideo",
  {
    videoID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    videoDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },

    videoTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },

    videoPath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    videoWatchCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    videoStarCount: { type: Sequelize.INTEGER, defaultValue: 0 }
  },
  {
    freezeTableName: true
  }
);

module.exports = VideoModel;
