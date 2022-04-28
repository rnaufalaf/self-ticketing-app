const { Destination, Ticket, Summary } = require("../models");

class DestinationController {
  static async getDestinations(req, res) {
    try {
      let destinations = await Destination.findAll();
      res.render("destinationPage.ejs", { destinations });
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
  static async displayAddDestinationForm(req, res) {
    res.render("addDestinationForm.ejs");
  }
  static async addDestination(req, res) {
    console.log(req.body);
    const { name, type, image, price, description } = req.body;

    try {
      await Destination.create({ name, type, image, price, description });
      res.redirect("/destination");
    } catch {
      res.json({
        message: "Couldn't add destination'",
      });
    }
  }
  static async deleteDestination(req, res) {
    const id = Number(req.params.id);

    try {
      let ticketData = await Ticket.findAll({
        where: { DestinationId: id },
      });

      let ticketIds = ticketData.map((ticketId) => {
        return ticketId.dataValues.id;
      });

      console.log(ticketIds);

      await Summary.destroy({
        where: { TicketId: ticketIds },
      });

      await Ticket.destroy({
        where: { id: ticketIds },
      });

      await Destination.destroy({
        where: { id: id },
      });

      res.redirect("/destination");
    } catch {
      res.json({ message: "Couldn't delete destination" });
    }
  }

  static async displayEditDestinationForm(req, res) {
    const id = Number(req.params.id);

    try {
      let destination = await Destination.findOne({ where: { id: id } });
      res.render("editDestinationForm.ejs", { destination });
    } catch (err) {
      res.json({ message: err });
    }
  }
  static async updateDestination(req, res) {
    const id = Number(req.params.id);
    const { name, type, image, price, description } = req.body;

    try {
      await Destination.update(
        { name, type, image, price, description },
        { where: { id: id } }
      );
      res.redirect("/destination");
    } catch {
      res.json({ message: "Couldn't update destination" });
    }
  }
}

module.exports = DestinationController;
