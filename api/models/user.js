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
  }, {tableName: 'Users'});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};

export default generateUserModel;
