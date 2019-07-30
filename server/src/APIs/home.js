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

router.get("/", async (req, res) => {
  let page = req.query.page;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
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
      res.json({ err: false, gelen, gelenLen: gelen.length });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
