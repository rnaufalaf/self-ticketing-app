const SummaryRoute = require("express").Router();

const { SummaryController } = require("../controllers");

SummaryRoute.get("/", SummaryController.getSummaries);
SummaryRoute.get(
  "/addTouristToTicket/:ticketId/:touristId",
  SummaryController.addTouristToTicket
);

module.exports = SummaryRoute;
