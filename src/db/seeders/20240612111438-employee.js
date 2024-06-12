"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Employees", [
      {
        firstName: "Jhon",
        lastName: "Doe",
        email: "jhonDoe@test.test",
        mobilePhone: "099888332",
        phone: "099888332",
        placeOfBirth: "Jakarta",
        birthdate: new Date(),
        gender: "Male",
        isMerried: false,
        identityType: "KTP",
        identityNumber: "123",
        isPermanent: false,
        identityEpireDate: new Date(),
        postcalCode: "2020",
        cityIdaddress: "010101",
        residentialAddress: "jl. surabaya, desa madura, jawa tengah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Employees", null, {});
  },
};
