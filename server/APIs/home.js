const {
  Sequelize,
  Op,
  jwt,
  PRIVATE_KEY,
  PUBLIC_KEY,
  apiV,
  hashPassword,
  verifyPassword,
  options,
  models
} = require("./imports");

var express = require("express");
var router = express.Router();

router.get(`/home`, async (req, res) => {
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
    res.json({ err: false, gelen, gelenLen: gelen.length });
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
