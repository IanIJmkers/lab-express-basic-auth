const router = require("express").Router();

// GET

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", async(req, res, next) => {
  res.render("profile.hbs");
});

// POST

module.exports = router;
