module.exports = (sequelize, Sequelize) => {
  const Calories = sequelize.define(
    "calories",
    {
      calorieID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        
      },
      constantValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numberOfCalorie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Calories;
};
