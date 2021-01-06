'use strict';
module.exports = (sequelize, DataTypes) => {
 const menuItem = sequelize.define('menuItem', {
   content: DataTypes.STRING,
   price: DataTypes.DOUBLE
 }, {});
 menuItem.associate = function(models) {
   menuItem.belongsTo(models.restaurant, {
     foreignKey: 'restaurantId',
     onDelete: 'CASCADE',
   })
 };
 return menuItem;
};
