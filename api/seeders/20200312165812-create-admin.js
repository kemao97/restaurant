'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      id: '8cba5136-b8b4-4bc2-96d1-c34560d07f21',
      email: 'admin@gmail.com',
      password: '$2a$09$7mhfDGwvNxt5DNVNn3sJle1dWN7cqrtMK7jg2zMXtQDKjt9xvS3Bm',
      address: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', [{
      id: '8cba5136-b8b4-4bc2-96d1-c34560d07f21',
    }], {});
  },
};
