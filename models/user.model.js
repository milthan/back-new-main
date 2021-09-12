module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      userID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
  }
  );

  return User;
};
