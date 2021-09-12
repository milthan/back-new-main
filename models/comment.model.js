module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
      "comment",
      {
        commentID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
         
        },
        commentDetail: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return Comment;
  };
  