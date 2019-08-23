const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");
const VideoModel = require("./Video");

const CommentModel = sequelize.define(
  "tblComment",
  {
    commentID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    commentDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },

    commentLikeCount: Sequelize.INTEGER
  },
  {
    freezeTableName: true
  }
);

UserModel.hasMany(CommentModel, {
  foreignKey: "fUserID"
});

CommentModel.belongsTo(UserModel, {
  foreignKey: "fUserID"
});

VideoModel.hasMany(CommentModel, {
  foreignKey: "fVideoID"
});

CommentModel.belongsTo(VideoModel, {
  foreignKey: "fVideoID"
});

module.exports = CommentModel;
