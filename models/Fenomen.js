const sequelize = require('./index');
const Sequelize = require('sequelize');
const LevelModel = require('./Level');

const FenomenModel = sequelize.define("tblFenomen",{
    FenomenID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },

},
    {
        freezeTableName: true,
        timestamps: false
    }
) 

FenomenModel.belongsTo(LevelModel,{
    foreignKey: "fLevels"
})

module.exports = FenomenModel;