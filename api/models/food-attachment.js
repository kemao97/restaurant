const generateFoodAttachmentModel = (sequelize, DataTypes) => {
  const Food = sequelize.define('FoodAttachment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    path: DataTypes.STRING,
  }, {tableName: 'FoodAttachment'});
  Food.associate = (models) => {
    // associations can be defined here
  };
  return Food;
};

export default generateFoodAttachmentModel;
