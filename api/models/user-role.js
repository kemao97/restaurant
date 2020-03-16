const generateUserRoleModel = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {tableName: 'UserRole'});
  UserRole.associate = (models) => {
  };
  return UserRole;
};

export default generateUserRoleModel;
