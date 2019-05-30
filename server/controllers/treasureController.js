module.exports = {
  dragonTreasure: (req, res) => {
    const db = req.app.get("db");
    db.get_dragon_treasure(1).then(response => {
      res.status(200).send(response);
    });
  },
  getUserTreasure: (req, res, next) => {
    // const { id } = req.session.user;
    const db = req.app.get("db");
    db.get_all_treasure([req.session.user.id]).then(all => {
      console.log(all);
      res.status(200).send(all);
    });
  }
};
