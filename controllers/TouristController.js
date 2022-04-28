const { Tourist, Summary, Ticket, Destination } = require("../models");

class TouristController {
  static async getTourists(req, res) {
    try {
      let tourists = await Tourist.findAll({
        include: [Ticket],
      });
      res.render("touristPage.ejs", { tourists });
    } catch (err) {
      res.json(err);
    }
  }
  static async getTourist(req, res) {
    const id = Number(req.params.id);
    try {
      let tourist = await Tourist.findOne({
        where: { id: id },
        include: [Ticket],
      });

      let ticketsData = tourist.dataValues.Tickets.map((ticket) => {
        return ticket.dataValues;
      });

      console.log(ticketsData);

      let destinationIds = ticketsData.map((ticket) => {
        return ticket.DestinationId;
      });

      let destinationsClass = await Destination.findAll({
        where: {
          id: destinationIds,
        },
      });

      let destinations = JSON.parse(JSON.stringify(destinationsClass));

      let detailsObj = {
        ticketsData,
        destinations,
      };

      console.log(detailsObj);

      res.render("touristDetailsPage.ejs", { detailsObj, tourist });
    } catch (err) {
      res.json(err);
    }
  }
  static async displayAddTouristForm(req, res) {
    res.render("addTouristForm.ejs");
  }

  static async displayAssignTouristPage(req, res) {
    let touristList = await Tourist.findAll();
    console.log(touristList);
    res.render("assignTouristPage.ejs", { touristList });
  }
  static async displayAssignTouristAgain(req, res) {
    const ticketId = Number(req.params.ticketId);
    let touristList = await Tourist.findAll();
    console.log(touristList);
    res.render("assignTouristAgainPage.ejs", { ticketId, touristList });
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

      res.redirect("/tourist");
    } catch (err) {
      res.json(err);
    }
  }
  static async deleteTourist(req, res) {
    const id = Number(req.params.id);

    try {
      let summary = await Summary.findOne({
        where: { TouristId: id },
        attributes: ["TicketId"],
      });

      if (summary !== null) {
        await Ticket.destroy({
          where: { id: summary.TicketId },
        });

        await Summary.destroy({
          where: { TicketId: summary.TicketId },
        });

        await Tourist.destroy({
          where: { id: id },
        });
      } else {
        await Tourist.destroy({
          where: { id: id },
        });
      }

      res.redirect("/tourist");
    } catch (err) {
      res.json({ message: "Couldn't delete tourist" });
    }
  }
  static async displayUpdateTouristForm(req, res) {
    const id = Number(req.params.id);
    let tourist = await Tourist.findOne({
      where: { id: id },
    });
    console.log(tourist);
    res.render("editTouristForm.ejs", { id, tourist });
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
      res.redirect(`/tourist/${id}`);
    } catch {
      res.json({ message: "Couldn't update tourist" });
    }
  }
}

module.exports = TouristController;
