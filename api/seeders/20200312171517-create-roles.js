'use strict';

import {Op} from 'sequelize';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [{
      id: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      name: 'admin',
      description: 'role manager admin pages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'e4141982-9711-46ee-a256-0185a314fbad',
      name: 'customer',
      description: 'role of customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', {
      id: {
        [Op.in]: [
          'e59b1824-babc-4899-9c15-3b1e1ef22e62',
          'e4141982-9711-46ee-a256-0185a314fbad',
        ],
      },
    }, {});
  },
};
