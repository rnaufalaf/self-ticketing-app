"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tourist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tourist.belongsToMany(models.Ticket, { through: models.Summary });
    }
  }
  Tourist.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      id_card_number: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      nationality: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tourist",
    }
  );
  return Tourist;
};
