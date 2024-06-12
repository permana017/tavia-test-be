"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      mobilePhone: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      placeOfBirth: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.STRING,
      },
      isMerried: {
        type: Sequelize.BOOLEAN,
      },
      identityType: {
        type: Sequelize.STRING,
      },
      identityNumber: {
        type: Sequelize.STRING,
      },
      isPermanent: {
        type: Sequelize.BOOLEAN,
      },
      identityEpireDate: {
        type: Sequelize.DATE,
      },
      postcalCode: {
        type: Sequelize.STRING,
      },
      cityIdaddress: {
        type: Sequelize.STRING,
      },
      residentialAddress: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
