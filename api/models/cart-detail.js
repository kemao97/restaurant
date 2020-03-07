const generateCartDetailModel = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: DataTypes.INTEGER,
    cartId: DataTypes.UUID,
    foodId: DataTypes.UUID,
  }, {tableName: 'CartDetail'});
  CartDetail.associate = (models) => {
    const {CartDetailModel, CartModel, FoodModel} = models;
    CartDetailModel.Cart = CartDetailModel.belongsTo(CartModel);
    CartDetailModel.Food = CartDetailModel.belongsTo(FoodModel);
  };
  return CartDetail;
};

export default generateCartDetailModel;
