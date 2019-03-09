const sequelize = require('./index');
const Sequelize = require('sequelize');
const CommentModel = require('./Comment');
const TalentModel = require('./Talent');

const VideoModel = sequelize.define("tblVideo",{
    videoID : {
        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },

    videoDescription : {
        type: Sequelize.STRING,
        allowNull: false
    },

    videoTitle : {
        type: Sequelize.STRING,
        allowNull: false
    },

    videoWatchCount : Sequelize.INTEGER,

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

    TalentModel.hasMany(VideoModel, {
        foreignKey: "fVTalentID"
    })


    VideoModel.belongsTo(TalentModel, {
        foreignKey: "fVTalentID"
    })


    CommentModel.hasMany(VideoModel, {
        foreignKey: "fVCommentID"
    })
    
    
    VideoModel.belongsTo(CommentModel, {
        foreignKey: "fVCommentID"
    })

module.exports = VideoModel;