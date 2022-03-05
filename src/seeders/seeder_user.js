'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345678',
      fullName: 'Huynh Kim Anh',
      address: 'Can Tho',
      phoneNumber: '0932738874',
      gender: '0',
      roleId: 'R1',
      positionId: 'admin',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
