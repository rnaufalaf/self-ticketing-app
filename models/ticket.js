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
      Ticket.belongsTo(models.Destination, {
        foreignKey: "DestinationId",
      });
      Ticket.belongsToMany(models.Tourist, { through: models.Summary });
    }
  }
  Ticket.init(
    {
      DestinationId: DataTypes.INTEGER,
      visit_date: { type: DataTypes.STRING, allowNull: false },
      qty: { type: DataTypes.INTEGER, allowNull: false },
      grossAmount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
