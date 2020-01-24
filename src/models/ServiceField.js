const { Model, DataTypes } = require('sequelize');

class ServiceField extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'service_field',
    })
  }

  static associate(models) {
    this.belongsToMany(models.Company, { foreignKey: 'service_field_id', through: 'company_service_field' , as: 'companies' } );
  }

}

module.exports = ServiceField;