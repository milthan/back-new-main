module.exports = (sequelize, Sequelize) => {
  const RecipesIngredient = sequelize.define(
    "recipesIngredient",
    {
      re_IngredientsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantityValue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ingredientsName:{
        type: Sequelize.STRING, 
        allowNull: false
      },
    },
    { 
      timestamps: false,
      freezeTableName: true,
    }
  );

  return RecipesIngredient;
};
