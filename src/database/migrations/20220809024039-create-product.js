'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2)
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      points_converter: {
        type: Sequelize.DECIMAL(9, 2)
      },
      size: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};