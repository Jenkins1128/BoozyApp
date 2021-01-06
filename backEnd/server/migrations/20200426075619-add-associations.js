'use strict';
 
module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.createTable(
     'userRestaurant',
     {
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
       userId: {
         type: Sequelize.INTEGER,
         primaryKey: true,
       },
       restaurantId: {
         type: Sequelize.STRING,
         primaryKey: true,
       },
     }
   )
 },
 
 down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('userRestaurant');
 }
};
