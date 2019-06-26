module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'Book',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
