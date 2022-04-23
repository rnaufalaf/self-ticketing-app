const SummaryRoute = require("express").Router();

const { SummaryController } = require("../controllers");

SummaryRoute.get("/", SummaryController.getSummaries);

module.exports = SummaryRoute;
