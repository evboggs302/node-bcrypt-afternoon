module.exports = {
  usersOnly: (req, res, next) => {
    // const db = req.app.get("db");
    if (!req.session.user) {
      return res.status(404).send("Please Login");
    }
    next();
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.isAdmin) {
      return res.status(403).send("You are not an admin");
    }
    next();
  }
};
