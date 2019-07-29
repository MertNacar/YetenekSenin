const jwt = require("jsonwebtoken");
const options = require("./options");// options for token
const fs = require("fs");// file-system
const PRIVATE_KEY = fs.readFileSync("./src/Tokenize/private.key", "utf8");//read private key
const PUBLIC_KEY = fs.readFileSync("./src/Tokenize/public.key", "utf8");//read public key

const validateToken = token => {
  return jwt.verify(token, PUBLIC_KEY, options.verifyOptions());
};

const createToken = username => {
  return jwt.sign({ username }, PRIVATE_KEY, options.signOptions());
};

module.exports = {
  validateToken,
  createToken
};
