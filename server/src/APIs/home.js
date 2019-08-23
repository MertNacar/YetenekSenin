const {
  Sequelize,
  Op,
  jwt,
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
                attributes: ["isFollow"],
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

// kendini takip etmeme kontrolu saglanmalı {userID followerID ve isFollow} yollanacak
router.post("/toggleFollow", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let follow = await models.FollowerModel.findOrCreate({
        where: { userID: data.userID, followerID: data.followerID }
      });
      follow[0].isFollow = data.isFollow;
      follow[0].save();
      res.json({ err: false });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

// kendini videosunu begenmeme kontrolu saglanmalı {userID videoID ve isLike} yollanacak
router.post("/toggleStar", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let star = await models.StarVideoModel.findOrBuild({
        where: { userID: data.userID, videoID: data.videoID }
      });
      star[0].isLike = data.isLike;
      star[0].save();
      res.json({ err: false });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

// videoya göre yorumların çekilmesi
router.get("/getComments", async (req, res) => {
  let data = req.query;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let comments = await models.CommentModel.findAll({
        attributes: ["commentID", "commentDescription", "commentLikeCount"],
        include: [
          {
            required: true,
            model: models.VideoModel,
            attributes: [],
            where: {
              videoID: data.videoID
            }
          }
        ]
      });
      res.json({ err: false, comments });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

module.exports = router;
