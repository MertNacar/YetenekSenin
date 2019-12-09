const { Sequelize, Op, jwt, models } = require("./imports");

var express = require("express");
var router = express.Router();

router.get("/competitions", async (req, res) => {
  try {
    let userID = req.query.userID
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let competitions = await models.CompetitionModel.findAll({
        attributes: ["competitionID", "competitionTitle", "competitionDescription", "competitionFinishDate"],
        where: { competitionIsFinish: 0 },
        include: [
          {
            model: models.TalentModel,
            attributes: ["talentName"],
          },
          {
            model: models.UserCompetitionModel,
            attributes: ["voteVideoID"],
            where: { userID }
          }
        ]
      });
      res.json({ err: false, competitions });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true, errreS: err.message });
  }
});

router.get("/competitions/videos", async (req, res) => {
  try {
    let data = req.query
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let videos = await models.UserCompetitionModel.findAll({
        attributes: ["uploadVideoID", "voteVideoID"],
        where: {
          competitionID: data.competitionID,
          uploadVideoID: { [Op.not]: null }
        },
        offset: 2 * data.page,
        limit: 2,
        include: [
          {
            required: true,
            as: "upload",
            model: models.VideoModel,
            attributes: [
              "videoID",
              "videoPath",
              "videoDescription",
              "videoTitle",
              "videoWatchCount",
              "videoStarCount",
              "createdAt"
            ],
          },
          {
            required: true,
            model: models.UserModel,
            attributes: ["userID", "username"],
          }
        ]
      });
      res.json({ err: false, videos, videosLen: videos.length });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true, mes: err.message });
  }
});

// kendini takip etmeme kontrolu saglanmalı {userID followerID ve isFollow} yollanacak
router.post("/toggleFollow", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let follow = await models.FollowerModel.findOrBuild({
        where: { userID: data.userID, followerID: data.followerID }
      });
      follow[0].isFollow = data.isFollow;
      follow[0].save();
      res.json({ err: false });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

// kendini videosunu begenmeme kontrolu saglanmalı {userID videoID ve competitionID} yollanacak
router.post("/toggleVote", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let vote = await models.UserCompetitionModel.findOrBuild({
        where: { competitionID: data.competitionID, userID: data.userID }
      });
      if (vote[0].voteVideoID === null || vote[0]._options.isNewRecord) {
        vote[0].voteVideoID = data.videoID
      } else if (vote[0].voteVideoID === data.videoID) {
        vote[0].voteVideoID = null
      }
      else {
        return res.json({ callback: true })
      }
      console.log(vote[0].voteVideoID)
      vote[0].save();
      res.json({ err: false, callback: false, voteVideoID: vote[0].voteVideoID });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true, callback: false });
  }
});

router.post("/forceVote", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let vote = await models.UserCompetitionModel.findOrBuild({
        where: { competitionID: data.competitionID, userID: data.userID }
      });
      vote[0].voteVideoID = data.videoID
      vote[0].save();
      res.json({ err: false, voteVideoID: vote[0].voteVideoID });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

// videoya göre yorumların çekilmesi
router.get("/getComments", async (req, res) => {
  try {
    let data = req.query;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
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

//TODOOOOOOOOO
// takıp edilenler
/*router.get("/competitions/videos", async (req, res) => {
  try {
    let data = req.query
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let competitions = await models.UserCompetitionModel.findAll({
        attributes: [null],
        where: {
          competitionID: data.competitionID,
          uploadVideoID: { [Op.not]: null }
        },
        include: [
          {
            required: true,
            model: models.VideoModel,
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

            ]
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
                  userID: data.userID,
                  isBlock: 0
                }
              }
            ]
          }
        ]
      });
      res.json({ err: false, competitions });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});
*/

// BAKKKKKKKKKKKK
/*router.get("/", async (req, res) => {
  try {
  let data = req.query;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
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
                  userID: data.userID,
                  isBlock: 0
                }
              }
            ]
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
*/
