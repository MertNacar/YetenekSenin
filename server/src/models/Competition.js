const sequelize = require("./index");
const Sequelize = require("sequelize");
const TalentModel = require("./Talent");

const CompetitionModel = sequelize.define(
  "tblCompetition",
  {
    competitionID: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },

    competitionTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },

    competitionDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },

    competitionVoteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    competitionWatchCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    competitionIsFinish: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    competitionStartDate: {
      type: Sequelize.DATE,
      allowNull: false
    },

    competitionFinishDate: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true
  }
);

TalentModel.hasMany(CompetitionModel, {
  foreignKey: "fTalentID"
});

CompetitionModel.belongsTo(TalentModel, {
  foreignKey: "fTalentID"
});

module.exports = CompetitionModel;
