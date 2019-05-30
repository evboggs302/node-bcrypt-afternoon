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
  },
  login: (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    db.get_user(username).then(user => {
      console.log("this is user:", user);
      if (!user[0]) {
        res.status(401).send("User NOT Found");
      } else {
        bcrypt.compare(password, user[0].hash).then(result => {
          if (!result) {
            res.status(403).send("Incorrect Password");
          } else {
            const visitor = user[0];
            req.session.user = {
              isAdmin: visitor.is_admin,
              id: visitor.id,
              username: visitor.username
            };
            res.status(201).send(req.session.user);
          }
        });
      }
    });
  }
};
