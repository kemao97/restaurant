const generateCartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    soldAt: DataTypes.DATE,
  }, {tableName: 'Cart'});
  Cart.associate = (models) => {
    const {CartModel, CartDetailModel, FoodModel} = models;
    CartModel.hasMany(CartDetailModel);
    CartModel.belongsToMany(FoodModel, {through: CartDetailModel});
  };
  return Cart;
};

export default generateCartModel;
