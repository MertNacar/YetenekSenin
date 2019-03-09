const sequelize = require('./index');
const Sequelize = require('sequelize');


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




module.exports = SubTalentModel;