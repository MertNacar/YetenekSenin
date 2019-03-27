const sequelize = require('./index');
const Sequelize = require('sequelize');
const SubTalentModel = require('./SubTalent');
const TalentModel = require('./Talent');
const FenomenModel = require('./Fenomen');


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


SubTalentModel.hasMany(UserModel, {
    foreignKey: "fSubTalentID"
})


UserModel.belongsTo(SubTalentModel, {
    foreignKey: "fSubTalentID"
})

TalentModel.hasMany(UserModel, {
    foreignKey: "fTalentID"
})


UserModel.belongsTo(TalentModel, {
    foreignKey: "fTalentID"
})




FenomenModel.hasMany(UserModel, {
    foreignKey: "fUFenomenID"
})


UserModel.belongsTo(FenomenModel, {
    foreignKey: "fUFenomenID"
})





module.exports = UserModel;