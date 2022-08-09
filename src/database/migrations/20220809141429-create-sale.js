'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'users'
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'users'
        },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
      totalPoints: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
      deliveryAddress: {
        type: Sequelize.STRING(255),
      },
      deliveryNumber: {
        type: Sequelize.STRING(255),
      },
      saleDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING(50),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};