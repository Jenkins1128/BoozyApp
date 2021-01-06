'use strict';
module.exports = (sequelize, DataTypes) => {
 const review = sequelize.define('review', {
   content: DataTypes.INTEGER,
   userId: DataTypes.INTEGER,
 }, {});
 review.associate = function(models) {
  review.belongsTo(models.restaurant, {
    foreignKey: 'restaurantId',
    onDelete: 'CASCADE',
  })
 };
 return review;
};
