const { Destination } = require("../models");

class DestinationController {
  static async getDestinations(req, res) {
    try {
      let destinations = await Destination.findAll();
      res.json(destinations);
    } catch (err) {
      res.json(err);
    }
  }
  static async getDestination(req, res) {
    const id = Number(req.params.id);

    try {
      let destination = await Destination.findOne({
        where: {
          id: id,
        },
      });
      res.json(destination);
    } catch (err) {
      res.json(err);
    }
  }
  static async addDestination(req, res) {
    const { name, type, image } = req.body;

    try {
      await Destination.create({ name, type, image });
      res.json({ message: `Destination ${name} has been added` });
    } catch {
      res.json({
        message: "Couldn't add destination'",
      });
    }
  }
  static async deleteDestination(req, res) {
    const id = Number(req.params.id);

    try {
      await Destination.destroy({
        where: { id: id },
      });
      res.json({ message: `Destination ${id} has been deleted` });
    } catch {
      res.json({ message: "Couldn't delete destination" });
    }
  }
  static async updateDestination(req, res) {
    const id = Number(req.params.id);
    const { name, type, image } = req.body;

    try {
      await Destination.update({ name, type, image }, { where: { id: id } });
      res.json({ message: `Destination ${id} has been updated` });
    } catch {
      res.json({ message: "Couldn't update destination" });
    }
  }
}

module.exports = DestinationController;
