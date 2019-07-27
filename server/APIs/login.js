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

//login validate with form
router.post(`/login`, async (req, res) => {
  let { username, password } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      attributes: ["username", "password"],
      where: {
        username
      }
    });
    console.log(data.username)
    console.log(username)
    if (data.username === username) {
      let hashedPassword = await hashPassword(password);
      let confirm = await verifyPassword(password, hashedPassword);
      console.log(confirm)
      if (confirm) {
        let token = jwt.sign(
          { Username: data.username },
          PRIVATE_KEY,
          options.signOptions(data.username)
        );
        res.json({ err: false, token });
      } else res.json({ err: true });
    } else {
      throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

module.exports = router;
