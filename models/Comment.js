const sequelize = require('./index');
const Sequelize = require('sequelize');

const CommentModel = sequelize.define("tblComment",{
    CommentID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    
    commentDescription : {
        type: Sequelize.STRING,
        allowNull: false
    },

    commentLikeCount : Sequelize.INTEGER,

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

module.exports = CommentModel;