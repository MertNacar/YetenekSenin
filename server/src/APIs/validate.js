const {
  Sequelize,
  Op,
  jwt,
  hashPassword,
  verifyPassword,
  models
} = require("./imports");

var express = require("express");
var router = express.Router();

//validate for inputs
router.post("/username", async (req,res) => {
  let { username } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      where: {
        username
      }
    });
    if (data !== null) res.json({ err: true });
    else res.json({ err: false });
  } catch {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/email", async (req,res) => {
  let { email } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      where: {
        email
      }
    });
    if (data !== null) res.json({ err: true });
    else res.json({ err: false });
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
