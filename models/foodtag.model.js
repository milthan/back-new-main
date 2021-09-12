module.exports = (sequelize, Sequelize) => {
  const FoodTag = sequelize.define(
    "foodtag",
    {
      tagID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tagName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return FoodTag;
};
