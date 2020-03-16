const generateRoleModel = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {tableName: 'Role'});
  Role.associate = (models) => {
    const {RoleModel, UserModel, ResourceModel, OperationModel, UserRoleModel} = models;
    RoleModel.belongsToMany(UserModel, {
      through: UserRoleModel,
    });
    RoleModel.belongsToMany(ResourceModel, {
      through: OperationModel,
    });
    RoleModel.hasMany(OperationModel);
  };
  return Role;
};

export default generateRoleModel;
