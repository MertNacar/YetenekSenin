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
    await models.UserModel.create(user);
    let data = await models.UserModel.findOne({
      attributes: ["userID"],
      where: {
        username: user.username
      }
    });
    user = {...user,...data.dataValues}
    user.token = token;
    user.loginDate = Date(Date.now()).toString();
    delete user.password;
    res.json({ err: false, user });
  } catch (err) {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/validate/username", async (req, res) => {
  try {
    let username = req.body.data;
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
  try {
  let email = req.body.data;
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

router.post("/validate/phone", async (req, res) => {
  try {
  let phone = req.body.data;
    let data = await models.UserModel.findOne({
      attributes: ["phone"],
      where: {
        phone
      }
    });

    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

/*
router.get("/talent", async (req, res) => {
  try {
    let data = await models.TalentModel.findAll({
      attributes: ["talentID", "talentName"]
    });

    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.post("/subTalent", async (req, res) => {
  try {
  let talentID = req.body.data;
    let data = await models.SubTalentModel.findAll({
      attributes: ["subTalentID", "subTalentName"],
      include: [
        {
          required: true,
          model: models.TalentModel,
          attributes: [],
          where: {
            talentID
          }
        }
      ]
    });
    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});*/

module.exports = router;
