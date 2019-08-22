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
  let data = req.query;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let gelen = await models.VideoModel.findAll({
        attributes: [
          "videoID",
          "videoPath",
          "videoDescription",
          "videoTitle",
          "videoWatchCount",
          "videoStarCount",
          "createdAt"
        ],
        offset: 3 * data.page,
        limit: 3,
        include: [
          {
            required: true,
            model: models.StarVideoModel,
            attributes: ["isLike"],
            where: {
              userID: data.userID
            }
          },
          {
            required: true,
            model: models.UserModel,
            attributes: ["username"],
            include: [
              {
                required: true,
                model: models.FollowerModel,
                attributes: [],
                where: {
                  userID: data.userID
                }
              }
            ]
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
  } catch (err) {
    res.json({ err: true, err: err.message });
  }
});

router.post("/follow", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      //follow işlemleri
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

router.delete("/unfollow", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      //olan follow geri alma delete
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

router.post("/giveStar", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      //VİDEO İÇİN STAR UPDATE arttırma için
      let video = await models.VideoModel.findOne({
        where: { videoID: data.videoID }
      });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

router.put("/takeStar", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      //VİDEO İÇİN STAR update azaltmak için
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
