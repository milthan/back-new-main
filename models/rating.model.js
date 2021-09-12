module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define(
      "rating",
      {
        ratingID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          
        },
        ratingStars: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return Rating;
  };
  