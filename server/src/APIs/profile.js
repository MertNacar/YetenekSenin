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
router.get("/", async (req, res) => {
  let { username } = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validete = jwt.validateToken(token);
  try {
    if (validete) {
      await models.UserModel.findOne({
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
          username,
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
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});
// TO DOOOOOOOOOO PASSWORD UPDATE
router.put("/update/all", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let user = await models.UserModel.findOne({
        attributes: [
          "password",       
        ],
        where: {
          username: data.oldUsername
        }
      });
      
      await user.update({
        firstname: data.firstname,
        surname: data.surname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        aboutMe: data.aboutMe,
        city: data.city,
        birthday: data.birthday,
        profilePhoto: data.profilePhoto,
        socialMedia: data.socialMedia
      });
      res.json({ err: false });
    }
  } catch {
    res.json({ err: true });
  }
});

router.put("/update/password", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let user = await models.UserModel.findOne({
        where: {
          username: data.oldUsername
        }
      });
      let old = await hashPassword(data.oldPassword)
     // let new = await verifyPassword(data.)
      await user.update({
        firstname: data.firstname,
        surname: data.surname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        aboutMe: data.aboutMe,
        city: data.city,
        birthday: data.birthday,
        profilePhoto: data.profilePhoto,
        socialMedia: data.socialMedia
      });
      res.json({ err: false });
    }
  } catch {
    res.json({ err: true });
  }
});


module.exports = router;
