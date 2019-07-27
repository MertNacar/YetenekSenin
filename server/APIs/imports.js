const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const models = require("../models/models");
const fs = require("fs"); //read file
const jwt = require("jsonwebtoken"); //create token
const options = require("../src/Tokenize/options");
const { hashPassword, verifyPassword } = require("../src/Hashing/hash"); //hashing password
const PRIVATE_KEY = fs.readFileSync("./src/Tokenize/private.key", "utf8"); // read private key file
const PUBLIC_KEY = fs.readFileSync("./src/Tokenize/public.key", "utf8"); // read public key file
const Op = Sequelize.Op; // OR LIKE AND operator ....
const config = require("config");
const apiV = config.server.api;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = {
  app,
  Sequelize,
  Op,
  jwt,
  PRIVATE_KEY,
  PUBLIC_KEY,
  apiV,
  hashPassword,
  verifyPassword,
  options,
  models
};