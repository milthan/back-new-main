module.exports = (sequelize, Sequelize) => {
  const Collection = sequelize.define(
    "collection",
    {
      collectionID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Collection;
};
