/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'ratings',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

export default userModel;
