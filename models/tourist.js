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
      name: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      id_card_number: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      nationality: { type: DataTypes.STRING, allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Tourist",
    }
  );
  return Tourist;
};
