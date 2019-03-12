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
       let gelen = await models.FollowerModel.findOne({
        where: { followID: 2}
        })
        console.log(gelen)
        if(gelen.length == 0){
            throw new Error("Hata")
        }else {
            gelen.fuserID = 3;
            gelen.fFollowerID = 6;
            gelen.save().catch( err => {
                console.log(err.message);
            })
            res.json({err : false,
                FollowID: gelen.followID,
                UserID: gelen.fuserID,
                FollowerID: gelen.fFollowerID})
               
            }
            
        }
        catch{
            res.json({err : true})
        }
    })

module.exports = app;