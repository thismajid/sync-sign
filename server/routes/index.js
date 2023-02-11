const { Router } = require("express");

const indexController = require("./../controllers");

const router = Router();

router.get("/", (req, res, next) => {
  const user = req.session.user || "unlogged";
  res.render("index", {
    what: `server - your email is: ${user}`,
    title: "Server | Home",
  });
});

router.get("/login", indexController.getLogin);

router.post("/login", indexController.postLogin);

module.exports = router;
