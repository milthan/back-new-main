module.exports = (sequelize, Sequelize) => {
    const RecipesFoodtag = sequelize.define(
      "recipesFoodtag",
      {
       rft_ID: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        tagID: {
          type: Sequelize.STRING,
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
  
    return RecipesFoodtag;
  };
  