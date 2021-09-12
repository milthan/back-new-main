module.exports = (sequelize, Sequelize) => {
    const Emoji = sequelize.define(
      "emoji",
      {
        emojiID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          
        },
        emojiDetail: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return Emoji;
  };
  