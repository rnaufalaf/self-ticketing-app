"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsToMany(models.Tourist, { through: models.Summary });
    }
  }
  Ticket.init(
    {
      ticket_number: DataTypes.STRING,
      destination: DataTypes.STRING,
      type: DataTypes.STRING,
      visit_date: DataTypes.DATE,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
