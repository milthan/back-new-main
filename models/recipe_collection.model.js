module.exports = (sequelize, Sequelize) => {
    const RecipeCollection = sequelize.define(
      "recipeCollection",
      {
        rc_ID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return RecipeCollection;
  };
  