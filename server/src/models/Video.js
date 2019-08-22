const sequelize = require("./index");
const Sequelize = require("sequelize");
const CommentModel = require("./Comment");
const TalentModel = require("./Talent");
const SubTalentModel = require("./SubTalent");
const UserModel = require("./User");

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

UserModel.hasMany(VideoModel, {
  foreignKey: "fUserID"
});

VideoModel.belongsTo(UserModel, {
  foreignKey: "fUserID"
});

TalentModel.hasMany(VideoModel, {
  foreignKey: "fVTalentID"
});

VideoModel.belongsTo(TalentModel, {
  foreignKey: "fVTalentID"
});

SubTalentModel.hasMany(VideoModel, {
  foreignKey: "fVSubTalentID"
});

VideoModel.belongsTo(SubTalentModel, {
  foreignKey: "fVSubTalentID"
});

VideoModel.hasMany(CommentModel, {
  foreignKey: "fVCommentID"
});

CommentModel.belongsTo(VideoModel, {
  foreignKey: "fVCommentID"
});

module.exports = VideoModel;
