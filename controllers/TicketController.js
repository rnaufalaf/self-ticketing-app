const { Ticket, Summary, Destination } = require("../models");

class TicketController {
  static async getTickets(req, res) {
    try {
      let tickets = await Ticket.findAll({
        include: [Destination],
      });
      res.json(tickets);
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
  static async addTicket(req, res) {
    const touristId = Number(req.params.TouristId);
    console.log(touristId);
    const { DestinationId, visit_date, price, qty } = req.body;

    let destination = await Destination.findOne({
      where: {
        id: DestinationId,
      },
    });

    if (destination !== null) {
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

      res.json({
        message: `Ticket to ${destination.dataValues.name} has been added`,
      });
    } else {
      res.json({
        message: "Can't add ticket",
      });
    }
  }
  static async deleteTicket(req, res) {
    const id = Number(req.params.id);

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
      res.json({
        message: `Ticket has been deleted`,
      });
    } catch {
      res.json({
        message: `Can't delete ticket ${id}`,
      });
    }
  }
  static async updateTicket(req, res) {
    const id = Number(req.params.id);
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

      res.json({
        message: `Ticket ${id} has been updated`,
      });
    } catch {
      res.json({
        message: "Can't update ticket",
      });
    }
  }
}

module.exports = TicketController;
