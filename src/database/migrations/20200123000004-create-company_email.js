'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('company_email', {
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
        title: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
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
      return queryInterface.dropTable('company_email');
  }
};