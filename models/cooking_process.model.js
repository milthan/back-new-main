module.exports = (sequelize, Sequelize) => {
  const CookingProcess = sequelize.define(
    "cookingProcess",
    {
      processID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      processDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      processImage: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return CookingProcess;
};
