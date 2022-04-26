const { Ticket, Summary, Destination, Tourist } = require("../models");

class TicketController {
  static async getTickets(req, res) {
    try {
      let summaries = await Summary.findAll({
        include: [Ticket, Tourist],
      });

      let summariesObj = {};
      let tickets = [];
      let tourists = [];
      let destinationIds = [];

      if (summaries.length !== 0) {
        tickets = summaries.map((summary) => {
          return summary.Ticket.dataValues;
        });
        tourists = summaries.map((summary) => {
          return summary.Tourist.dataValues;
        });

        destinationIds = summaries.map((summary) => {
          return summary.Ticket.dataValues.DestinationId;
        });

        let destination = await Destination.findAll({
          attributes: ["name", "image"],
          where: {
            id: destinationIds,
          },
        });

        let destinations = destination.map((data) => {
          return data.dataValues;
        });

        summariesObj = {
          tickets,
          tourists,
          destinations,
        };

        console.log(summariesObj.tickets.length);
      }
      res.render("ticketPage.ejs", { summariesObj });
    } catch (err) {
      res.json(err);
    }
  }
  static async getTicket(req, res) {
    const id = Number(req.params.id);

    try {
      let ticket = await Ticket.findOne({
        include: [Destination],
        where: {
          id: id,
        },
      });
      res.json(ticket);
    } catch (err) {
      res.json(err);
    }
  }
  static async displayAddTicketForm(req, res) {
    let touristId = Number(req.params.TouristId);
    console.log(touristId);
    let destinations = await Destination.findAll();
    res.render("addTicketForm.ejs", { destinations, touristId });
  }
  static async addTicket(req, res) {
    const touristId = Number(req.params.TouristId);
    console.log(touristId);
    const { DestinationId, visit_date, price, qty } = req.body;
    console.log(DestinationId);

    let ticketData = await Ticket.create({
      DestinationId,
      visit_date,
      price,
      qty,
    });

    await Summary.create({
      TicketId: ticketData.dataValues.id,
      TouristId: touristId,
    });

    res.redirect("/ticket");
  }
  static async deleteTicket(req, res) {
    const id = Number(req.params.id);
    const touristId = Number(req.params.touristId);
    try {
      await Ticket.destroy({
        where: {
          id: id,
        },
      });

      await Summary.destroy({
        where: {
          TicketId: id,
        },
      });
      res.redirect(`/tourist/${touristId}`);
    } catch {
      res.json({
        message: `Can't delete ticket ${id}`,
      });
    }
  }
  static async displayUpdateTicketForm(req, res) {
    const touristId = Number(req.params.touristId);
    const id = Number(req.params.id);
    let ticket = await Ticket.findOne({
      where: { id: id },
    });
    let destinations = await Destination.findAll();
    res.render("editTicketForm.ejs", { id, destinations, ticket, touristId });
  }
  static async updateTicket(req, res) {
    const id = Number(req.params.id);
    const touristId = Number(req.params.touristId);
    const { DestinationId, visit_date, price, qty } = req.body;

    try {
      await Ticket.update(
        { DestinationId, visit_date, price, qty },
        {
          where: {
            id: id,
          },
        }
      );

      res.redirect(`/tourist/${touristId}`);
    } catch {
      res.json({
        message: "Can't update ticket",
      });
    }
  }
}

module.exports = TicketController;
