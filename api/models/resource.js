const generateResourceModel = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {tableName: 'Resource'});
  Resource.associate = (models) => {
    const {RoleModel, ResourceModel, OperationModel} = models;
    ResourceModel.belongsToMany(RoleModel, {
      through: OperationModel,
    });
    ResourceModel.hasMany(OperationModel);
  };
  return Resource;
};

export default generateResourceModel;
