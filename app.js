const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const models = require('./models/models');

//const Sequelize = require('sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', async (req, res) => { 
    let date = new Date() 
   try{
       let gelen = await models.FollowerModel.findOne({
        where: { followID: 1}
        })
        console.log(gelen)
        if(gelen.length == 0){
            throw new Error("Hata")
        }else {
            res.json({err : false,
                FollowID: gelen.followID,
                UserID: gelen.fuserID,
                FollowerID: gelen.fFollowerID})
            }
            gelen.fuserID = 3;
            gelen.fFollowerID = 5;
            gelen.createdAt = date.getFullYear(),date.getMonth(),date.getDate()
            gelen.createdAt = date.getFullYear(),date.getMonth(),date.getDate()
            gelen.save()
        }
        catch{
            res.json({err : true})
        }
})

module.exports = app;