const TicketRoute = require("express").Router();

const { TicketController } = require("../controllers");

TicketRoute.get("/", TicketController.getTickets);
TicketRoute.post("/add/:TouristId", TicketController.addTicket);
TicketRoute.get("/:id/", TicketController.getTicket);
TicketRoute.get("/delete/:id/", TicketController.deleteTicket);
TicketRoute.post("/update/:id/", TicketController.updateTicket);

module.exports = TicketRoute;
