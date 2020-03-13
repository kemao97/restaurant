'use strict';

import {Op} from 'sequelize';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Resource', [{
      id: 'dff6562b-0089-4b2c-8e49-44311a660f23',
      name: 'user',
      description: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'f0704f50-fe95-4318-bdf9-85f5597da4c4',
      name: 'food',
      description: 'food',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Resource', {
      id: {
        [Op.in]: [
          'dff6562b-0089-4b2c-8e49-44311a660f23',
          'f0704f50-fe95-4318-bdf9-85f5597da4c4',
        ],
      },
    }, {});
  },
};
