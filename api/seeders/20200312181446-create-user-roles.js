'use strict';

import {Op} from 'sequelize';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRole', [{
      id: '7cf31305-2a21-42c9-b1ff-b726ed6f4d66',
      userId: '8cba5136-b8b4-4bc2-96d1-c34560d07f21',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRole', {
      id: {
        [Op.in]: [
          '7cf31305-2a21-42c9-b1ff-b726ed6f4d66',
        ],
      },
    }, {});
  },
};
