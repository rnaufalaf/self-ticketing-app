const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    message: "Home Page",
  });
});

const TicketRoute = require("./TicketRoute");
route.use("/ticket", TicketRoute);

const TouristRoute = require("./TouristRoute");
route.use("/tourist", TouristRoute);

const SummaryRoute = require("./SummaryRoute");
route.use("/summary", SummaryRoute);

const DestinationRoute = require("./DestinationRoute");
route.use("/destination", DestinationRoute);

module.exports = route;
