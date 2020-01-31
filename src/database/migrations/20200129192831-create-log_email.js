'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('log_email', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'user', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        to_addresses: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        cc_addresses: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        bcc_addresses: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        source: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        attachment:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        message_id: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        error: {
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
      return queryInterface.dropTable('log_email');
  }
};