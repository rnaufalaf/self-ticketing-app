const DestinationRoute = require("express").Router();

const { DestinationController } = require("../controllers");

DestinationRoute.get("/", DestinationController.getDestinations);
DestinationRoute.post("/add", DestinationController.addDestination);
DestinationRoute.get("/:id", DestinationController.getDestination);
DestinationRoute.get("/delete/:id", DestinationController.deleteDestination);
DestinationRoute.post("/update/:id", DestinationController.updateDestination);

module.exports = DestinationRoute;
