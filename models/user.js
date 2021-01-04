const { Model } = require('sequelize');

class user extends Model {}
module.exports = (sequelize, DataTypes) => {
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'user',
  });
  return user;
};
