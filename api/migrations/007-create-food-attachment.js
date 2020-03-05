const createFoodAttachment = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FoodAttachment', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      path: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      foodId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Food',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('FoodAttachment');
  },
};

export default createFoodAttachment;
