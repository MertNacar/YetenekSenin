const { Sequelize, Op, jwt, models } = require("./imports");

var express = require("express");
var router = express.Router();

//video ekleme
router.post("/add", async (req, res) => {
  try {
    console.log("hey")
    let video = req.body.data
    console.log(video)
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let uploadVideo = await models.VideoModel.create(video.data);
      video.userCompetition.uploadVideoID = uploadVideo.videoID
      await models.UserCompetitionModel.upsert(video.userCompetition)
      res.json({ err: false });
    }
  } catch (err) {
    console.log(err.message)
    res.json({ err: true });
  }
});

router.get("/competitions", async (req, res) => {
  try {
    let userID = req.query.userID;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let competitions = await models.CompetitionModel.findAll({
        attributes: ["competitionID", "competitionTitle"],
        where: {
          competitionIsFinish: false
        },
        include: [
          {
            required: true,
            model: models.UserCompetitionModel,
            attributes: ["uploadVideoID"],
            where: {
              userID,
              uploadVideoID: { [Op.eq]: null }
            }
          }
        ]
      })
      res.json({ err: false, competitions });
    }
  } catch (err) {
    res.json({ err: true, SS: err.message });
  }
});

module.exports = router;
