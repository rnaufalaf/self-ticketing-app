const TouristRoute = require("express").Router();

const { TouristController } = require("../controllers");

TouristRoute.get("/", TouristController.getTourists);
TouristRoute.get("/addTourist", TouristController.displayAddTouristForm);
TouristRoute.get("/assignTourist", TouristController.displayAssignTouristPage);
TouristRoute.get(
  "/assignTouristAgain/:ticketId",
  TouristController.displayAssignTouristAgain
);
TouristRoute.post("/add", TouristController.addTourist);
TouristRoute.get("/delete/:id", TouristController.deleteTourist);
TouristRoute.get("/updateForm/:id", TouristController.displayUpdateTouristForm);
TouristRoute.post("/update/:id", TouristController.updateTourist);
TouristRoute.get("/:id", TouristController.getTourist);

module.exports = TouristRoute;
