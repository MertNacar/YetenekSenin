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
          "socialMedia"
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
        user.city = data.tblCity.city;
        delete user.tblTalent;
        delete user.tblSubTalent;
        delete user.tblCity
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        console.log("***************************", user);
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
        "socialMedia"
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
    console.log(
      "********************************************",
      data.dataValues
    );
    if (data === null) throw new Error();
    else {
      let confirm = await verifyPassword(password, data.password);
      if (confirm) {
        let token = jwt.createToken(data.username);
        let user = data.dataValues;
        user.talentName = data.tblTalent.talentName;
        user.subTalentName = data.tblSubTalent.subTalentName;
        user.city = data.tblCity.city;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        delete user.password;
        delete user.tblTalent;
        delete user.tblSubTalent;
        delete user.tblCity
        console.log("***************************", user);
        res.json({ err: false, user });
      } else res.json({ err: true });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ err: true });
  }
});

module.exports = router;
