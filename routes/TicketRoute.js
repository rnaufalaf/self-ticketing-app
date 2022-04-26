const TicketRoute = require("express").Router();

const { TicketController } = require("../controllers");

TicketRoute.get("/", TicketController.getTickets);
TicketRoute.get("/addTicket/:TouristId", TicketController.displayAddTicketForm);
TicketRoute.post("/add/:TouristId", TicketController.addTicket);
TicketRoute.get("/delete/:touristId/:id/", TicketController.deleteTicket);
TicketRoute.get(
  "/updateForm/:touristId/:id",
  TicketController.displayUpdateTicketForm
);
TicketRoute.post("/update/:touristId/:id", TicketController.updateTicket);
TicketRoute.get("/:id/", TicketController.getTicket);

module.exports = TicketRoute;
