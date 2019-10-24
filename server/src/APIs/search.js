const { Sequelize, Op, jwt, models } = require("./imports");

var express = require("express");
var router = express.Router();

//FRONTEND -- TODO --
//search username in search page
router.get("/user", async (req, res) => {
  try {
  let username = req.query.username;
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
    if (validate) {
      let users = await models.UserModel.findAll({
        attributes: ["userID", "username", "profilePhoto"],
        where: {
          username: {
            [Op.like]: `%${username}%`
          }
        },
      });
      if (users.length > 0) {
        res.json({ err: false, users: users });
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

router.get("/user/recommendation", async (req, res) => {
  try {
  let token = req.headers.authorization.split(" ")[1];
  let validate = jwt.validateToken(token);
    if (validate) {
      let users = await models.UserModel.findAll({
        attributes: ["userID", "username", "profilePhoto"],
        where: {       
          allVotes: {
            [Op.gte]: 5000
          }
        },
      });
      if (users.length > 0) {
        res.json({ err: false, users: users });
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
