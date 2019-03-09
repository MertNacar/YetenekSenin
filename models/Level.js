const sequelize = require('./index');
const Sequelize = require('sequelize');

const LevelModel = sequelize.define("tblLevel",{
    LevelID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    
    levelDescription : {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
) 

module.exports = LevelModel;