const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const models = require("../models/models");
const { hashPassword, verifyPassword } = require("../Hashing/hash"); //hashing password
const Op = Sequelize.Op; // OR LIKE AND operator ....
const config = require("config");
const apiV = config.server.api;
const jwt = require("../Tokenize/index")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = {
  app,
  Sequelize,
  jwt,
  Op,
  apiV,
  hashPassword,
  verifyPassword,
  models
};