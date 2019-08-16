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

// ------------  TODO  ------------------
//Get ınformation from user
router.post("/immediately", async (req, res) => {
  let username = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let data = await models.UserModel.findOne({
        attributes: [
          "firstname",
          "surname",
          "username",
          "email",
          "phone",
          "aboutMe",
          "city",
          "birthday",
          "profilePhoto",
          "socialMedia"
        ],
        where: {
          username
        },
        //inner joinleyince calısmıyor bak
        /*include: [
          {
            required: true,
            model: models.TalentModel,
            attributes: ["talentName"]
          },
          {
            required: true,
            model: models.SubTalentModel,
            attributes: ["subTalentName"]
          }
        ]*/
      });
      console.log(data.dataValues)
      if (data === null) throw new Error();
      else {
        let user = data.dataValues;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        res.json({ err: false, user });
      }
    } else throw new Error();
  } catch (err) {
    res.json({ err: true });
  }
});

//login validate with form
router.post("/", async (req, res) => {
  let { username, password } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      attributes: [
        "firstname",
        "surname",
        "username",
        "password",
        "email",
        "phone",
        "aboutMe",
        "city",
        "birthday",
        "profilePhoto",
        "socialMedia"
      ],
      where: {
        username
      }
    });
    if (data === null) throw new Error();
    else {
      let confirm = await verifyPassword(password, data.password);
      if (confirm) {
        let token = jwt.createToken(data.username);
        let user = data.dataValues
        user.token = token
        user.loginDate = Date(Date.now()).toString()
        delete user.password
        res.json({ err: false, user });
      } else res.json({ err: true });
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
