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
    console.log(user.gender);
    var token = jwt.createToken(user.username);
    let hash = await hashPassword(user.password);
    user.password = hash;
    await models.UserModel.create(user);
    let data = await models.UserModel.findOne({
      attributes: ["userID","fCity"],
      where: {
        username: user.username
      }
    });
    user.userID = data.userID;
    user.fCity = data.fCity
    user.token = token;
    user.loginDate = Date(Date.now()).toString();
    delete user.password;
    res.json({ err: false, user });
  } catch (err) {
    console.log(err.errors.map(error => error.message));
    res.json({ err: true, err: err.message });
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
      attributes: ["talentID", "talentName"]
    });

    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.post("/subTalent", async (req, res) => {
  let talentID = req.body.data;
  try {
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
});

module.exports = router;
