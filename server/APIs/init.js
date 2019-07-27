const {
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
} = require("./imports");

var express = require("express");
var router = express.Router();

// ------------  TODO  ------------------
//login with token without form or any click auto login
router.post(`/login/immediately`, async (req, res) => {
  let token = req.body.data.token;
  let validate;
  try {
    if (token) {
      validate = jwt.verify(token, PUBLIC_KEY, options.verifyOptions());
      if (validate) res.json({ err: false });
      else throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

module.exports = router;
