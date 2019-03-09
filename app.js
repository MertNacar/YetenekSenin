const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const models = require('./models/models');

//const Sequelize = require('sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))




app.get('/', (req, res) => {   

    models.VideoModel.findAll({
        include: [
            
            {
                model: models.TalentModel,
                required: true
            },
            {
                model: models.CommentModel,
                required: true
            }
        ]
    })
    .then( (data) => {
        res.json(data)
    })
})

module.exports = app;