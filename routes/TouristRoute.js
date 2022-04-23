const TouristRoute = require("express").Router();

const { TouristController } = require("../controllers");

TouristRoute.get("/", TouristController.getTourists);
TouristRoute.post("/add", TouristController.addTourist);
TouristRoute.get("/:id", TouristController.getTourist);
TouristRoute.get("/delete/:id", TouristController.deleteTourist);
TouristRoute.post("/update/:id", TouristController.updateTourist);

module.exports = TouristRoute;
