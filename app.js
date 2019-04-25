const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const models = require('./models/models');

//const Sequelize = require('sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.post('/login',async(req,res)=>{
   var username=req.body.username;
   var password=req.body.password;
    try{
      let gelen=await models.UserModel.findAll({
        attributes:['username','userPassword'],
        where:{
            username: username,
            userPassword: password
          }
      })
     if(gelen.length > 0){
         res.json({err:false})
     }
     else {
        throw new Error("Hata")
     }
  } catch{
    res.json({err : true})
}
})


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