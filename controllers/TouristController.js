const { Tourist, Summary, Ticket, Destination } = require("../models");

class TouristController {
  static async getTourists(req, res) {
    try {
      let tourists = await Tourist.findAll({
        include: [Ticket],
      });
      res.json(tourists);
    } catch (err) {
      res.json(err);
    }
  }
  static async getTourist(req, res) {
    const id = Number(req.params.id);
    console.log(id);
    try {
      let tourist = await Tourist.findOne({
        where: { id: id },
        include: [Ticket],
      });
      res.json(tourist);
    } catch (err) {
      res.json(err);
    }
  }
  static async addTourist(req, res) {
    const { name, age, id_card_number, phone_number, nationality, photo } =
      req.body;
    try {
      await Tourist.create({
        name,
        age,
        id_card_number,
        phone_number,
        nationality,
        photo,
      });
      res.json({ message: `Tourist ${name} has been added` });
    } catch (err) {
      res.json(err);
    }
  }
  static async deleteTourist(req, res) {
    const id = Number(req.params.id);

    try {
      await Tourist.destroy({
        where: { id: id },
      });
      res.json({ message: `Tourist ${id} has been deleted` });
    } catch (err) {
      res.json({ message: "Couldn't delete tourist" });
    }
  }
  static async updateTourist(req, res) {
    const id = Number(req.params.id);
    const { name, age, id_card_number, phone_number, nationality, photo } =
      req.body;

    try {
      await Tourist.update(
        {
          name: name,
          age: age,
          id_card_number,
          phone_number,
          nationality,
          photo,
        },
        { where: { id: id } }
      );
      res.json({ message: `Tourist ${id} has been updated` });
    } catch {
      res.json({ message: "Couldn't update tourist" });
    }
  }
}

module.exports = TouristController;
