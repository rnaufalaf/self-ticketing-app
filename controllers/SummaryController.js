const { Summary, Ticket, Tourist, Destination } = require("../models");

class SummaryController {
  static async getSummaries(req, res) {
    try {
      let summaries = await Summary.findAll({
        include: [Ticket, Tourist],
      });

      let summariesObj = {};
      let tickets = [];
      let tourists = [];
      let destinations = [];

      if (summaries.length !== 0) {
        tickets = summaries.map((summary) => {
          return summary.Ticket.dataValues;
        });

        tourists = summaries.map((summary) => {
          return summary.Tourist.dataValues;
        });

        destinations = summaries.map((summary) => {
          return summary.Ticket.dataValues.DestinationId;
        });

        function destinationData() {
          let promises = destinations.map((destination) => {
            return Destination.findOne({
              where: {
                id: destination,
              },
            });
          });
          return Promise.all(promises);
        }

        destinationData().then((result) => {
          destinations = JSON.parse(JSON.stringify(result));
          summariesObj = {
            tickets,
            tourists,
            destinations,
          };

          res.render("summaryPage.ejs", { summariesObj });
        });
      } else {
        summariesObj = null;
        res.render("summaryPage.ejs", { summariesObj });
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async addTouristToTicket(req, res) {
    try {
      const ticketId = Number(req.params.ticketId);
      const touristId = Number(req.params.touristId);

      let ticketData = await Ticket.findOne({
        where: {
          id: ticketId,
        },
      });

      if (ticketData.length !== null) {
        await Summary.create({ TicketId: ticketId, TouristId: touristId });
        res.render("assignTouristAgain.ejs", { ticketId });
      } else {
        res.json({ message: "User not found" });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = SummaryController;
