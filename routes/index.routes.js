const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/register", async(req, res, next) => {
  try {
    let response = await UserModel.findOne({ username: req.body.username });
    if (response) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
