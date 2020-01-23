'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('rating_field', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('rating_field');
  }
};