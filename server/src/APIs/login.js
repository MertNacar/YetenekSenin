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
  try {
    let username = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let data = await models.UserModel.findOne({
        attributes: [
          "userID",
          "firstname",
          "surname",
          "username",
          "email",
          "phone",
          "aboutMe",
          "gender",
          "birthday",
          "profilePhoto",
          "socialMedia",
          "fTalentID",
          "fSubTalentID",
          "fCity"
        ],
        where: {
          username
        },
        include: [
          {
            required: true,
            model: models.TalentModel,
            attributes: ["talentName"]
          },
          {
            required: true,
            model: models.SubTalentModel,
            attributes: ["subTalentName"]
          },
          {
            model: models.CityModel,
            attributes: ["city"]
          }
        ]
      });
      if (data === null) throw new Error();
      else {
        let user = data.dataValues;
        user.talentName = data.tblTalent.talentName;
        user.subTalentName = data.tblSubTalent.subTalentName;
        user.city = data.tblCity ? data.tblCity.city : "";
        delete user.tblTalent;
        delete user.tblSubTalent;
        delete user.tblCity;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        res.json({ err: false, user });
      }
    } else throw new Error();
  } catch {
    res.json({ err: true });
  }
});

//login validate with form
router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body.data;
    let data = await models.UserModel.findOne({
      attributes: [
        "userID",
        "firstname",
        "surname",
        "username",
        "password",
        "email",
        "phone",
        "aboutMe",
        "gender",
        "birthday",
        "profilePhoto",
        "socialMedia",
        "fTalentID",
        "fSubTalentID",
        "fCity"
      ],
      where: {
        username
      },
      include: [
        {
          required: true,
          model: models.TalentModel,
          attributes: ["talentName"]
        },
        {
          required: true,
          model: models.SubTalentModel,
          attributes: ["subTalentName"]
        },
        {
          model: models.CityModel,
          attributes: ["city"]
        }
      ]
    });
    if (data === null) throw new Error();
    else {
      let confirm = await verifyPassword(password, data.password);
      if (confirm) {
        let token = jwt.createToken(data.username);
        let user = data.dataValues;
        user.talentName = data.tblTalent.talentName;
        user.subTalentName = data.tblSubTalent.subTalentName;
        user.city = data.tblCity ? data.tblCity.city : "";
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        delete user.password;
        delete user.tblTalent;
        delete user.tblSubTalent;
        delete user.tblCity;
        res.json({ err: false, user });
      } else throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
