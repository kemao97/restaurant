const generateOperationModel = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {tableName: 'Operation'});
  Operation.associate = (models) => {
    const {OperationModel, RoleModel, ResourceModel} = models;
    OperationModel.belongsTo(RoleModel);
    OperationModel.belongsTo(ResourceModel);
  };
  return Operation;
};

export default generateOperationModel;
