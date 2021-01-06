'use strict';
module.exports = (sequelize, DataTypes) => {
 const user = sequelize.define('user', {
   email: DataTypes.STRING,
   password: DataTypes.STRING
 });
 user.associate = (models) => {
   user.belongsToMany(models.restaurant, { through: 'userRestaurant' });
 };
 return user;
};
