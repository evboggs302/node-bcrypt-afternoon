const express = require("express");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();
const port = 4000;
const app = express();
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require("./controllers/authController");
const treasureCtrl = require("./controllers/treasureController");
const auth = require("./middleware/middleware");

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected");
});
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/api/treasure/dragon", treasureCtrl.dragonTreasure);
app.get("/api/treasure/user", auth.usersOnly, treasureCtrl.getUserTreasure);

app.listen(port, () => console.log(`listening on port: ${port}`));
