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

// ------------  TODO  ------------------
//login with token without form or any click auto login
router.post("/immediately", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let validete = jwt.validateToken(token);
  try {
    if (validete) {
      res.json({ err: false });
    } else throw new Error();
  } catch (err) {
    res.json({ err: true });
  }
});

//login validate with form
router.post("/", async (req, res) => {
  let { username, password } = req.body.data;
  try {
    let data = await models.UserModel.findOne({
      attributes: ["username", "password"],
      where: {
        username
      }
    });
    if (data.username === username) {
      let hashedPassword = await hashPassword(password);
      let confirm = await verifyPassword(password, hashedPassword);
      if (confirm) {
        let token = jwt.createToken(data.username);
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
