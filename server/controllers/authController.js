const bcrypt = require("bcryptjs");

module.exports = {
  register: (req, res, next) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get("db");
    db.get_user(username).then(user => {
      const existingUser = user[0];
      if (existingUser) {
        res.status(409).send("Username Taken");
      } else {
        const salt = 10;
        console.log(salt);
        bcrypt.hash(password, salt).then(hashedPassword => {
          //   console.log("this is hash:", hash);
          db.register_user([isAdmin, username, hashedPassword]).then(
            fromBack => {
              console.log("this is res: ", fromBack);
              const registeredUser = fromBack;
              var user = registeredUser[0];
              req.session.user = {
                isAdmin: user.is_Admin,
                id: user.id,
                username: user.username
              };
              res.status(201).send(req.session.user);
            }
          );
        });
      }
    });
  }
};
