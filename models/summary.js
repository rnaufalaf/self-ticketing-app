"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Summary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Summary.belongsTo(models.Ticket);
      Summary.belongsTo(models.Tourist);
    }
  }
  Summary.init(
    {
      TicketId: DataTypes.INTEGER,
      TouristId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Summary",
    }
  );
  return Summary;
};
