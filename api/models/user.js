const generateUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phone: DataTypes.STRING,
  }, {tableName: 'User'});
  User.associate = (models) => {
    const {UserModel, CartModel} = models;
    UserModel.hasMany(CartModel);
  };
  return User;
};

export default generateUserModel;
