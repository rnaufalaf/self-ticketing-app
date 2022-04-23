const { Summary } = require("../models");

class SummaryController {
  static async getSummaries(req, res) {
    try {
      await Summary.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = SummaryController;
