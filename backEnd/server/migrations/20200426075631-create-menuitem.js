'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('menuItems', {
     id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
     },
     content: {
       type: Sequelize.STRING
     },
     createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
     restaurantId: {
       type: Sequelize.STRING,
       onDelete: 'CASCADE',
       references: {
         model: 'restaurants',
         key: 'id',
         as: 'restaurantId'
       }
     },
     price: {
       type: Sequelize.MONEY
     }
   });
 },
 down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('menuItems')
 }
};
