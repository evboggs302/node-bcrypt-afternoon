module.exports = {
  usersOnly: (req, res, next) => {
    // const db = req.app.get("db");
    if (!req.session.user) {
      return res.status(404).send("Please Login");
    }
    next();
  }
};
