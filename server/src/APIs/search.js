const {
  Sequelize,
  Op,
  jwt,
  apiV,
  hashPassword,
  verifyPassword,
  models
} = require("./imports");

var express = require("express");
var router = express.Router();

//FRONTEND -- TODO --
//search username in search page
router.get("/:user", async (req, res) => {
  let username = req.params.user;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
  try {
    if (validate) {
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
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
