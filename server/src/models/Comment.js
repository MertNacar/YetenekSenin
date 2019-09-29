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

    commentLikeCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    freezeTableName: true
  }
);

UserModel.hasMany(CommentModel, {
  foreignKey: {
    name: "fUserID",
    allowNull: false
  }
});

CommentModel.belongsTo(UserModel, {
  foreignKey: {
    name: "fUserID",
    allowNull: false
  }
});

VideoModel.hasMany(CommentModel, {
  foreignKey: {
    name: "fVideoID",
    allowNull: false
  }
});

CommentModel.belongsTo(VideoModel, {
  foreignKey: {
    name: "fVideoID",
    allowNull: false
  }
});

module.exports = CommentModel;
