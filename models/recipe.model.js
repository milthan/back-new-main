module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define(
    "recipe",
    {
      recipeID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      recipeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      shareOption: {
        type: Sequelize.BOOLEAN,
      },
      serveNumber: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  return Recipe;
};
