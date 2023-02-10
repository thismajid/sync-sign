const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
  const user = req.session.user || "unlogged";
  res.render("index", {
    what: `server - your state is: ${user}`,
    title: "Server | Home",
  });
});

module.exports = router;
