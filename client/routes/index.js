const { Router } = require("express");

const router = Router();

router.use("*", (req, res, next) => res.redirect("/login"));

router.get("/login", (req, res, next) => {
  const user = req.session.user || "unlogged";
  res.render("index", {
    what: `Client side: ${user}`,
    title: "Client | Home",
  });
});

module.exports = router;
