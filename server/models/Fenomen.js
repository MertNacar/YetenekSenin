const sequelize = require('./index');
const Sequelize = require('sequelize');


const FenomenModel = sequelize.define("tblFenomen",{
    FenomenID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
   
    FenomenBar : {
        allowNull:false,
        type: Sequelize.INTEGER,
    
    },
    FenomenDescription : {
        allowNull:false,
        type: Sequelize.STRING,
    
    }

},
    {
        freezeTableName: true,
        timestamps: false
    }
) 


module.exports = FenomenModel;