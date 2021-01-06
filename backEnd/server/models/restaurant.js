'use strict';
module.exports = (sequelize, DataTypes) => {
 const restaurant = sequelize.define('restaurant', {
   id: {
     type: DataTypes.STRING,
     primaryKey: true,
     allowNull: false,
    
   },
   name: DataTypes.STRING,
 });
 restaurant.associate = (models) => {
   restaurant.belongsToMany(models.user, { through: 'userRestaurant'});
   restaurant.hasMany(models.review, {
     foreignKey: 'restaurantId'
   })
   restaurant.hasMany(models.menuItem, {
     foreignKey: 'restaurantId'
   })
 };
 return restaurant;
};
