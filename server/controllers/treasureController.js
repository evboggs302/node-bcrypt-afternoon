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
  },
  addMyTreasure: async (req, res, next) => {
    const { treasureURL } = req.body;
    const { id } = req.session.user;
    const userTreasure = await req.app
      .get("db")
      .add_user_treasure(treasureURL, id);
    res.status(200).send(userTreasure);
  },
  getAllTreasure: async (req, res) => {
    const allTreasure = await req.app.get("db").get_all_treasure();
    return res.status(200).send(allTreasure);
  }
};
