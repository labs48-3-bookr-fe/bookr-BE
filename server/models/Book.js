module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  Book.associate = (models) => {
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      as: 'reviews',
      onDelete: 'CASCADE'
    });
    Book.hasMany(models.Rating, {
      foreignKey: 'bookId',
      as: 'ratings',
      onDelete: 'CASCADE'
    });
  };
  return Book;
};
