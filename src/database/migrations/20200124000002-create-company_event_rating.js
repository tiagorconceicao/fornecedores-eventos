'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('company_event_rating', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull: false,
        },
        company_event_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'company_event', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        rating_field_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'rating_field', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
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
      return queryInterface.dropTable('company_event_rating');
  }
};