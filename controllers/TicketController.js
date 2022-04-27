const { Ticket, Summary, Destination, Tourist } = require("../models");

class TicketController {
  static async getTickets(req, res) {
    try {
      let tickets = await Ticket.findAll({
        include: [Destination],
      });

      let destinations = tickets.map((ticket) => {
        return ticket.dataValues.Destination;
      });

      res.render("ticketPage.ejs", { tickets, destinations });
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

    const { DestinationId, visit_date, qty } = req.body;

    let destinationPrice = await Destination.findOne({
      attributes: ["price"],
      where: {
        id: DestinationId,
      },
    });

    let grossAmount = destinationPrice.dataValues.price * qty;

    let ticketData = await Ticket.create({
      DestinationId,
      visit_date,
      qty,
      grossAmount,
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
    const { DestinationId, visit_date, qty } = req.body;

    try {
      let destinationPrice = await Destination.findOne({
        attributes: ["price"],
        where: {
          id: DestinationId,
        },
      });

      let grossAmount = destinationPrice.dataValues.price * qty;

      await Ticket.update(
        { DestinationId, visit_date, qty, grossAmount },
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
