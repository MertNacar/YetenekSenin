const {
  Sequelize,
  Op,
  jwt,
  apiV,
  hashPassword,
  verifyPassword,
  models
} = require("./imports");

var express = require("express");
var router = express.Router();

//FRONTEND -- TODO --
//get profile's info
router.get("/", async (req, res) => {
  let { username, password } = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validete = jwt.validateToken(token);
  try {
    if (validete) {
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
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
