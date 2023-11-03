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
    if (!response) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.redirect("/auth/login.hbs");
    } else {
        // send error message
        res.render("auth/register.hbs", { errorMessage: response.errorMessage });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async(req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: req.body.email });
  
  if (foundUser) {
    let isPasswordValid = bcrypt.compareSync(
        req.body.password, 
        foundUser.password
    );
    
    if (isPasswordValid) {
        res.redirect("/auth/login");
    } else {
      res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
    } 
  } else {
      res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
    }
  });
module.exports = router;
