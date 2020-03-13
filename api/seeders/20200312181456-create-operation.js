'use strict';

import {Op} from 'sequelize';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Operation', [{
      id: '9f37db14-bf9d-43ba-9329-b728af2871a3',
      name: 'create',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'dff6562b-0089-4b2c-8e49-44311a660f23',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'eebca2c6-f5ed-47f4-bb60-31bad56dc610',
      name: 'read',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'dff6562b-0089-4b2c-8e49-44311a660f23',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'cdae819a-16a1-458e-b1cd-fcef39abb3dd',
      name: 'delete',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'dff6562b-0089-4b2c-8e49-44311a660f23',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'af31c32f-0b23-434c-a274-bb7e5b3c51fc',
      name: 'create',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'f0704f50-fe95-4318-bdf9-85f5597da4c4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: '765624c7-8474-4491-aef9-e9f851a7a20b',
      name: 'read',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'f0704f50-fe95-4318-bdf9-85f5597da4c4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: '7a2746d0-0c00-4b59-9d57-c7d7df941f8c',
      name: 'update',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'f0704f50-fe95-4318-bdf9-85f5597da4c4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'dff6414d-ad1f-4c91-bcda-5f0bb7e4ae5e',
      name: 'delete',
      description: '',
      roleId: 'e59b1824-babc-4899-9c15-3b1e1ef22e62',
      resourceId: 'f0704f50-fe95-4318-bdf9-85f5597da4c4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Operation', {
      id: {
        [Op.in]: [
          '9f37db14-bf9d-43ba-9329-b728af2871a3',
          'eebca2c6-f5ed-47f4-bb60-31bad56dc610',
          'cdae819a-16a1-458e-b1cd-fcef39abb3dd',
          'af31c32f-0b23-434c-a274-bb7e5b3c51fc',
          '765624c7-8474-4491-aef9-e9f851a7a20b',
          '7a2746d0-0c00-4b59-9d57-c7d7df941f8c',
          'dff6414d-ad1f-4c91-bcda-5f0bb7e4ae5e',
        ],
      },
    }, {});
  },
};
