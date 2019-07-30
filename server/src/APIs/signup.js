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

//SIGNUP
router.post("/", async (req, res) => {
  try {
    let data = req.body.data;
    let validate = await models.UserModel.findOne({
      attributes: ["userID", "username", "email"],
      where: {
        [Op.or]: [
          {
            username: {
              [Op.eq]: data.username
            }
          },
          {
            email: {
              [Op.eq]: data.email
            }
          }
        ]
      }
    });

    if (validate === null) {
      var token = jwt.createToken(data.username);
      let hash = await hashPassword(data.password);
      data.password = hash;
      await models.UserModel.create(data);
      res.json({ err: false, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ err: true });
  }
});

module.exports = router;
