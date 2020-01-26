'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('company_message', {
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
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        fixed: {
          type: Sequelize.BOOLEAN,
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
      return queryInterface.dropTable('company_message');
  }
};