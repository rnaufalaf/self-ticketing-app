const DestinationRoute = require("express").Router();

const { DestinationController } = require("../controllers");

DestinationRoute.get("/", DestinationController.getDestinations);
DestinationRoute.get(
  "/addDestination",
  DestinationController.displayAddDestinationForm
);
DestinationRoute.post("/add", DestinationController.addDestination);
DestinationRoute.get("/delete/:id", DestinationController.deleteDestination);
DestinationRoute.get(
  "/updateDestination/:id",
  DestinationController.displayEditDestinationForm
);
DestinationRoute.post("/update/:id", DestinationController.updateDestination);
DestinationRoute.get("/:id", DestinationController.getDestination);

module.exports = DestinationRoute;
