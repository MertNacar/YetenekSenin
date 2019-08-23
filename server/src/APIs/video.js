const {
  Sequelize,
  Op,
  jwt,
  models
} = require("./imports");

var express = require("express");
var router = express.Router();

//video ekleme
router.post("/add", async (req, res) => {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
      let talents = await models.TalentModel.findOne({
        attributes: ["talentID"],
        where: {
          talentName: data.talentName
        },
        include: [
          {
            required: true,
            model: models.SubTalentModel,
            attributes: ["subTalentID"],
            where: { subTalentName: data.subTalentName }
          }
        ]
      });

      let user = await models.UserModel.findOne({
        attributes: ["userID"],
        where: {
          username: data.username
        }
      });

      let fVTalentID = talents.talentID;
      let fVSubTalentID = talents.tblSubTalents[0].subTalentID;
      let result = {
        ...data.video,
        fVTalentID,
        fVSubTalentID,
        fUserID: user.userID
      };

      await models.VideoModel.create(result);
      res.json({ err: false });
    }
  } catch (err) {
    res.json({ err: true });
  }
});

module.exports = router;
