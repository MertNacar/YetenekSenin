const sequelize = require("./index");
const Sequelize = require("sequelize");
const UserModel = require("./User");
const VideoModel = require("./Video");
const CompetitionModel = require("./Competition")

const UserCompetitionModel = sequelize.define(
  "tblUserCompetition",
  {
    userCompetitionID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    indexes: [
      {
        name: "joinCompetitionID",
        unique: true,
        fields: ["competitionID", "userID"]
      }
    ],

    freezeTableName: true
  }
);

UserModel.hasMany(UserCompetitionModel, {
  foreignKey: {
    name: "userID",
    allowNull: false
  },
});

UserCompetitionModel.belongsTo(UserModel,{
  foreignKey: {
    name: "userID",
    allowNull: false
  },
})

CompetitionModel.hasMany(UserCompetitionModel, {
  foreignKey: {
    name: "competitionID",
    allowNull: false
  },
});

UserCompetitionModel.belongsTo(CompetitionModel, {
  foreignKey: {
    name: "competitionID",
    allowNull: false
  },
});


VideoModel.hasMany(UserCompetitionModel, {
  foreignKey: "uploadVideoID"
});

UserCompetitionModel.belongsTo(VideoModel,{
foreignKey: "uploadVideoID"
});

VideoModel.hasMany(UserCompetitionModel, {
foreignKey: "voteVideoID"
});

UserCompetitionModel.belongsTo(VideoModel, {
foreignKey: "voteVideoID"
});



module.exports = UserCompetitionModel;
