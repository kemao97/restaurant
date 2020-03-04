const createOperation = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Operation', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      resourceId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Operation');
  },
};

export default createOperation;
