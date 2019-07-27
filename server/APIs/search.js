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

//FRONTEND -- TODO --
//search username in search page
router.get(`/search/:user`, async (req, res) => {
  let username = req.params.user;
  try {
    let data = await models.UserModel.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      }
    });
    if (data.length > 0) {
      res.json({ err: false, data });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
