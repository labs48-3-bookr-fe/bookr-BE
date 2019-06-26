module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    timestamps: false
  });
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE'
    });
    Rating.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'Book',
      onDelete: 'CASCADE'
    });
  };
  return Rating;
};
