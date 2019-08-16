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

// ilişkili create işlemi bakılacak
router.post("/add", async (req, res) => {
  let video = req.body;
  console.log(video)
  /*let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);*/
  try {
    //if (validate) {
    let cre = await models.VideoModel.create(video);
    console.log("cre",cre)
    let a = await models.VideoModel.findAll()
    res.json({ err: false, video: a });
    //}
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

module.exports = router;
