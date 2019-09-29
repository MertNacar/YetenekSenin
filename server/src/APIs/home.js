const { Sequelize, Op, jwt, models } = require("./imports");

var express = require("express");
var router = express.Router();

router.get("/competitions", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let competitions = await models.CompetitionModel.findAll({
        attributes: ["competitionTitle", "competitionDescription", "competitionVoteCount", "competitionWatchCount", "competitionFinishDate"],
        where: { competitionIsFinish: 0 },
        include: [
          {
            model: models.TalentModel,
            attributes: ["talentName"],
          },
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

router.get("/competitions/videos", async (req, res) => {
  try {
    let data = req.query
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let competitions = await models.UserCompetitionModel.findAll({
        attributes: ["voteVideoID"],
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
          }
        ]
      });
      res.json({ err: false, competitions });
    } else {
      throw new Error();
    }
  } catch(err) {
    res.json({ err: true,mes:err.message });
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

// kendini videosunu begenmeme kontrolu saglanmalı {userID videoID ve isLike} yollanacak
router.post("/toggleStar", async (req, res) => {
  try {
    let data = req.body.data;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
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
  } catch {
    res.json({ err: true });
  }
});

router.post("/deneme", async (req, res) => {
  try {
    
      let star = await models.FollowerModel.findAll({
        include:[{
     
          model: models.UserModel
        }

        ]
      });
        res.json({sss: star})
  } catch (err){
    res.json({ err: true,mess:err.message });
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
