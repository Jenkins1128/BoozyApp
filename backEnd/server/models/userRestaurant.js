'use strict';
module.exports = (sequelize, DataTypes) => {
 const userRestaurant = sequelize.define('userRestaurant', {
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      restaurantId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
          type: DataTypes.STRING
      }
 }, {
     freezeTableName: true, // prevent sequelize from making model plural
 });
 return userRestaurant;
};
