const sequelize = require('./index');
const Sequelize = require('sequelize');
const TalentModel = require('./Talent');

const SubTalentModel = sequelize.define("tblSubTalent",{
    subTalentID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },

    subTalentName : Sequelize.STRING,
},
    {
        freezeTableName: true,
        timestamps: false
    }
) 
TalentModel.hasMany(SubTalentModel, {
    foreignKey: "fSubTalent"
})


SubTalentModel.belongsTo(TalentModel, {
    foreignKey: "fSubTalent"
})




module.exports = SubTalentModel;