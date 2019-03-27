const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const models = require('./models/models');

//const Sequelize = require('sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', async (req, res) => { 
   try{
        let gelen = await models.VideoModel.findAll({
        attributes: ['videoPath','videoDescription', 'videoTitle', 'videoWatchCount', 'createdAt'],
        include : [{
            required: true,
            model: models.UserModel,
            attributes:['username']
        },{
            required: true,
            model: models.TalentModel,
            attributes:['talentName'],
        },{
            required: true,
            model: models.SubTalentModel,
            attributes:['subTalentName']
        }
    ]
        })
        console.log(gelen)
        if(gelen.length == 0){
            throw new Error("Hata")
        }else {                  
            res.json({err:false,
                gelen})      
            }     
        }
        catch{
            res.json({err : true})
        }
    }) 

module.exports = app;