'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('company_location', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull: false,
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'company', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        state: {
          type: Sequelize.STRING(3),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
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
      return queryInterface.dropTable('company_location');
  }
};