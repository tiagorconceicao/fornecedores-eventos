'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user', {
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
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        admin: {
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
      }).then(()=>queryInterface.bulkInsert('user',[
        {
          id: 1,
          name: 'Master Admin',
          email: 'root@admin.com',
          password: 'root',
          active: true,
          admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],{}));
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user');
  }
};