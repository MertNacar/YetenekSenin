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

//validate for inputs
router.post(`/validate/username`, async () => {
  let { username } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      where: {
        username
      }
    });
    if (data.length === 1) res.json({ err: true });
    else res.json({ err: false });
  } catch {
    res.json({ err: true });
  }
});

//validate for inputs
router.post(`/validate/email`, async () => {
  let { email } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      where: {
        email
      }
    });
    if (data.length === 1) res.json({ err: true });
    else res.json({ err: false });
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
