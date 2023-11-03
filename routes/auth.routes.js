const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET route register

router.get("/register", async(req, res, next) => {
  res.render("auth/register.hbs");
});
//   try {
//     let response = await UserModel.findOne({ username: req.body.username });
//     if (!response) {
//       // const salt = bcryptjs.genSaltSync(12);
//       // const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
//       // const newUser = await UserModel.create({
//       //   ...req.body,
//       //   password: hashedPassword,
//       // });
//       // res.redirect("/auth/login.hbs");
//     } else {
//         // send error message
//         res.render("auth/register.hbs", { errorMessage: response.errorMessage });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/login", async(req, res, next) => {
  res.render("auth/login.hbs");
});
// POST route register

router.post("/register", async(req, res, next) => {
  console.log(req.body)
  try{
    let response = await UserModel.findOne({ username: req.body.username })
    if (!response) {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt)
      const newUser = await UserModel.create({...req.body,  password: hashedPassword });
      console.log("New user created", newUser);
      res.redirect("/auth/login.hbs");
    } else {
      console.log("User already exists");
      res.render("auth/register.hbs", { errorMessage: "User taken!!!" });
    }
  } catch (error) {
    console.log(error);
  }
});


router.post("/login", async(req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: req.body.email });
  if(!foundUser) {
    res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
  } else {
    const isPasswordValid = bcryptjs.compareSync(
      req.body.password, 
      foundUser.password
      );
      console.log(isPasswordValid);
    };
    if(isPasswordValid) {
      res.redirect("/profile.hbs");
    }else {
      res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
    }
  });
  // if (foundUser) {
  //   let isPasswordValid = bcryptjs.compareSync(
  //       req.body.password, 
  //       foundUser.password
  //   );
    
  //   if (isPasswordValid) {
  //       res.redirect("/auth/login.hbs");
  //   } else {
  //     res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
  //   } 
  // } else {
  //     res.render("auth/login.hbs", { errorMessage: "Invalid email or password" });
  //   }
  // });
module.exports = router;
