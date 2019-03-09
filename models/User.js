const sequelize = require('./index');
const Sequelize = require('sequelize');
const TalentModel = require('./Talent');
const CommentModel = require('./Comment');
const FenomenModel = require('./Fenomen');
const VideoModel = require('./Video');

const UserModel = sequelize.define("tblUser",{
    userID : {

        primaryKey : true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    
    firstname : {
        type: Sequelize.STRING,
        allowNull: false
    },

    surname : {
        type: Sequelize.STRING,
        allowNull: false
    },

    username : {
        type: Sequelize.STRING,
        allowNull: false
    },

    userPassword : {
        type: Sequelize.STRING.BINARY,
        allowNull: false
    },

    phone : Sequelize.STRING,

    aboutMe : Sequelize.STRING,

    city : Sequelize.STRING,

    birthday : {
        type: Sequelize.DATE,
        allowNull: false
    },

    profilePhoto : Sequelize.STRING,

    socialMedia : Sequelize.STRING,

    email : {
        type: Sequelize.STRING,
        allowNull: false
    },

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


TalentModel.hasMany(UserModel, {
    foreignKey: "fUTalentID"
})


UserModel.belongsTo(TalentModel, {
    foreignKey: "fUTalentID"
})


CommentModel.hasMany(UserModel, {
    foreignKey: "fUCommentID"
})


UserModel.belongsTo(CommentModel, {
    foreignKey: "fUCommentID"
})

FenomenModel.hasMany(UserModel, {
    foreignKey: "fUFenomenID"
})


UserModel.belongsTo(FenomenModel, {
    foreignKey: "fUFenomenID"
})


VideoModel.hasMany(UserModel, {
    foreignKey: "fUVideoID"
})


UserModel.belongsTo(VideoModel, {
    foreignKey: "fUVideoID"
})

module.exports = UserModel;