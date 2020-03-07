const generateFoodModel = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {tableName: 'Food'});
  Food.associate = (models) => {
    const {FoodModel, FoodAttachmentModel, CartDetailModel, CartModel} = models;
    FoodModel.hasMany(FoodAttachmentModel);
    FoodModel.hasMany(CartDetailModel);
    FoodModel.belongsToMany(CartModel, {through: CartDetailModel});
  };
  return Food;
};

export default generateFoodModel;
