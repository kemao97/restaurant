const generateUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};

export default generateUserModel;
