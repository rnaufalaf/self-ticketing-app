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

        let ticketsData = await Ticket.findAll({
          include: [Destination],
          where: {
            DestinationId: destinationIds,
          },
        });

        let destinations = ticketsData.map((data) => {
          return data.dataValues.Destination;
        });

        summariesObj = {
          tickets,
          tourists,
          destinations,
        };
      }
      res.render("summaryPage.ejs", { summariesObj });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = SummaryController;
