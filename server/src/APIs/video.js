const { Sequelize, Op, jwt, models } = require("./imports");

var express = require("express");
var router = express.Router();

//video ekleme
router.post("/add", async (req, res) => {
  try {
  let data = req.body.data;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
    if (validate) {
      await models.VideoModel.create(data);
      res.json({ err: false });
    }
  } catch (err) {
    res.json({ err: true });
  }
});

module.exports = router;
