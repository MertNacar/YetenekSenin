const sequelize = require('./index');
const Sequelize = require('sequelize');

const FollowerModel = sequelize.define("tblFollower",{

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
},
    {
        freezeTableName: true
    }
) 

module.exports = FollowerModel;