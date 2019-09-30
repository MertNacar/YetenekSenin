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

//FRONTEND -- TODO --
//get profile's info
//talent kısmı bakkkkkkkkkk
router.get("/videos", async (req, res) => {
  try {
    let username = req.query.username;
    let token = req.headers.authorization.split(" ")[1];
    let validete = jwt.validateToken(token);
    if (validete) {
      let videos = await models.VideoModel.findAll({
        attributes: [
          "videoPath",
          "videoDescription",
          "videoTitle",
          "videoWatchCount",
          "videoStarCount",
          "createdAt"
        ],

        include: [
          {
            required: true,
            model: models.UserModel,
            attributes: ["allStars", "allVotes"],
            where: {
              username
            }
          },
          {
            required: true,
            model: models.TalentModel,
            attributes: ["talentName"]
          }
        ]
      });
      console.log(videos)
      res.json({ err: false, videos });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true, errrr: err.message });
  }
});

router.get("/show", async (req, res) => {
  try {
    let userID = req.query.userID;
    let token = req.headers.authorization.split(" ")[1];
    let validete = jwt.validateToken(token);
    if (validete) {
      console.log("heyy");
      let user = await models.UserCompetitionModel.findOne({
        attributes: ["userID"],
        where: { userID },
        include: [{
          model: models.UserModel,
          attributes: [
            "firstname",
            "surname",
            "username",
            "email",
            "gender",
            "phone",
            "aboutMe",
            "birthday",
            "profilePhoto",
            "socialMedia"],
          include: [
            {
              model: models.CityModel,
              attributes: ["city"]
            }
          ]
        },
        {
          model: models.VideoModel,
          attributes: [
            "videoPath",
            "videoDescription",
            "videoTitle",
            "videoWatchCount",
            "videoStarCount",
            "createdAt"
          ]
        },
        ],
      });
      res.json({ err: false, user });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true, err: err.message });
  }
});

// TO DOOOOOOOOOO PASSWORD UPDATE
router.put("/update/all", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    let validate = jwt.validateToken(token);
    console.log(validate);
    if (validate) {
      let user = await models.UserModel.findOne({
        attributes: ["userID"],
        where: {
          userID: data.userID
        }
      });
      await user.update({
        firstname: data.firstname,
        surname: data.surname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        aboutMe: data.aboutMe,
        fCity: data.fCity,
        birthday: data.birthday,
        gender: data.gender,
        profilePhoto: data.profilePhoto,
        socialMedia: data.socialMedia,
      });
      res.json({ err: false });
    }
  } catch (err) {
    console.log("error", err.message);
    res.json({ err: true });
  }
});
//userID oldPassword newPassword bekleniyo TODO CLIENT
router.put("/update/password", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    let user = await models.UserModel.findOne({
      attributes: ["userID", "password"],
      where: {
        userID: data.userID
      }
    });
    let validatePassword = await verifyPassword(
      data.oldPassword,
      user.password
    );
    if (validate && validatePassword) {
      let password = await hashPassword(data.newPassword);
      await user.update({
        password
      });
      res.json({ err: false });
    } else throw new Error();
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

router.get("/city", async (req, res) => {
  try {
    let data = await models.CityModel.findAll();
    if (data.length > 0) res.json({ err: false, data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
