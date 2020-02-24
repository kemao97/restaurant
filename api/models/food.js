const generateFoodModel = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  Food.associate = (models) => {
    // associations can be defined here
  };
  return Food;
};

export default generateFoodModel;
