const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const models = require("./models/models");
const fs = require("fs"); //read file
const jwt = require("jsonwebtoken"); //create token
const options = require("./src/Tokenize/options");
const { hashPassword, verifyPassword } = require("./src/Hashing/hash"); //hashing password
const PRIVATE_KEY = fs.readFileSync("./src/Tokenize/private.key", "utf8"); // read private key file
const PUBLIC_KEY = fs.readFileSync("./src/Tokenize/public.key", "utf8"); // read public key file
const Op = Sequelize.Op; // OR LIKE AND operator ....

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get all videos for homepage
app.get("/", async (req, res) => {
  let page = req.query.page;
  try {
    let gelen = await models.VideoModel.findAll({
      attributes: [
        "videoPath",
        "videoDescription",
        "videoTitle",
        "videoWatchCount",
        "createdAt"
      ],
      offset: 3 * page,
      limit: 3,
      include: [
        {
          required: true,
          model: models.UserModel,
          attributes: ["username"]
        },
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
      ]
    });
    let gelenLen = gelen.length;
    res.json({ err: false, gelen, gelenLen });
  } catch {
    res.json({ err: true });
  }
});

//FRONTEND -- TODO --
//search username in search page
app.get("/search/:user", async (req, res) => {
  let username = req.params.user;
  try {
    let data = await models.UserModel.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      }
    });
    if (data.length > 0) {
      res.json({ err: false, data });
    } else {
      throw new Error("Kullanıcı bulunamadı.");
    }
  } catch {
    res.json({ err: true, message: err.message });
  }
});

//SIGNUP
app.post("/signup", async (req, res) => {
  try {
    let data = req.body;
    let validate = await models.UserModel.findOne({
      attributes: ["userID", "username", "email"],
      where: {
        [Op.or]: [
          {
            username: {
              [Op.eq]: data.username
            }
          },
          {
            email: {
              [Op.eq]: data.email
            }
          }
        ]
      }
    });

    if (validate !== null) {
      throw new Error("Email veya kullanıcı adı kullanıyor.");
    } else {
      var token = jwt.sign(
        { username: data.username },
        PRIVATE_KEY,
        options.signOptions()
      );
      let hash = hashPassword(data.password);
      data.password = hash;
      await models.UserModel.create(data);
      res.json({ err: false, token });
    }
  } catch (err) {
    res.json({ err: true, message: err.message });
  }
});
// ------------  TODO  ------------------
//login with token without form or any click auto login
app.post("/login/immediately", async (req, res) => {
  let token = req.body.token;
  console.log(token)
  try {
    if (token) {
      let validate = jwt.verify(token, PUBLIC_KEY, options.verifyOptions());
      if (validate.iss == "YetenekSenin") res.json({ err: false, autoLogin: true });
      else throw new Error("kayıtlı kullanıcı yok");
    }
  } catch(err) {
    res.json({ err: true, message: err.message });
  }
});

//login validate with form
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let hashedPassword = hashPassword(password);
  try {
    let data = await models.UserModel.findOne({
      attributes: ["username", "password"],
      where: {
        username
      }
    });
    if (data.length === 1) {
      let confirm = verifyPassword(data.password, hashedPassword);
      let token = jwt.sign(
        { Username: data.username },
        PRIVATE_KEY,
        options.signOptions(data.username)
      );
      res.json({ status: confirm, token });
    } else {
      throw new Error(
        "Hatalı kullanıcı adı veya şifre lütfen tekrar deneyiniz."
      );
    }
  } catch {
    res.json({ err: true, message: err.message });
  }
});

//FRONTEND -- TODO --
//get profile's info
app.get("/profile", async (req, res) => {
  let { username, password } = req.body;
  try {
    await models.UserModel.findOne({
      attributes: [
        "firstname",
        "surname",
        "username",
        "phone",
        "aboutMe",
        "city",
        "birthday",
        "profilePhoto",
        "socialMedia"
      ],

      where: {
        username,
        password: password
      },
      include: [
        {
          required: true,
          model: models.VideoModel,
          attributes: [
            "videoPath",
            "videoDescription",
            "videoTitle",
            "videoWatchCount",
            "createdAt"
          ]
        },
        {
          required: true,
          model: models.TalentModel,
          attributes: ["talentName"]
        },
        {
          required: true,
          model: models.FenomenModel,
          attributes: ["FenomenBar"]
        },
        {
          required: true,
          model: models.FenomenModel,
          attributes: ["commentDescription", "commentLikeCount"]
        }
      ]
    });
    res.json({ err: false, data });
  } catch {
    res.json({ err: true });
  }
});

module.exports = app;
