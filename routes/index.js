const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    message: "Home Page",
  });
});

module.exports = route;
