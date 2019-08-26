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

//SIGNUP
router.post("/", async (req, res) => {
  try {
    let user = req.body.data;
    var token = jwt.createToken(user.username);
    let hash = await hashPassword(user.password);
    user.password = hash;
    let d = await models.UserModel.create(user);
    let data = await models.UserModel.findOne({
      attributes: ["userID"],
      where: {
        username: user.username
      }
    });
    console.log("d",d)
    user.userID = data.userID;
    user.token = token;
    user.loginDate = Date(Date.now()).toString();
    delete user.password;
    console.log("d",user)

    res.json({ err: false, user });
  } catch (err) {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/validate/username", async (req, res) => {
  let username = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      attributes: ["username"],
      where: {
        username
      }
    });
    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/validate/email", async (req, res) => {
  let email = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      attributes: ["email"],
      where: {
        email
      }
    });

    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.get("/talent", async (req, res) => {
  try {
    let data = await models.TalentModel.findAll({
      attributes: ["talentName"]
    });

    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.post("/subTalent", async (req, res) => {
  let talentName = req.body.data;
  try {
    let data = await models.SubTalentModel.findAll({
      attributes: ["subTalentName"],
      include: [
        {
          required: true,
          model: models.TalentModel,
          attributes: [],
          where: {
            talentName
          }
        }
      ]
    });
    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
