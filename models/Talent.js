const sequelize = require('./index');
const Sequelize = require('sequelize');
const SubTalentModel = require('./SubTalent');

const TalentModel = sequelize.define("tblTalent",{
    talentID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    fSubTalent : Sequelize.INTEGER
},
    {
        freezeTableName: true,
        timestamps: false
    }
) 

SubTalentModel.hasMany(TalentModel, {
    foreignKey: "fSubTalent"
})


TalentModel.belongsTo(SubTalentModel, {
    foreignKey: "fSubTalent"
})


module.exports = TalentModel;