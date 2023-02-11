const { USER_DB } = require("./../configs");

const getLogin = async (req, res, next) => {
  if (req.session.user != null) return res.redirect("/");
  res.render("login");
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!(USER_DB[email] && password === USER_DB[email].PASSWORD))
    return res.status(404).json({ message: "Invalid email and password" });

  req.session.user = email;
  res.redirect("/");
};

const logout = async (req, res, next) => {
  if (!req.session.user) return res.redirect("/");

  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  getLogin,
  postLogin,
  logout,
};
