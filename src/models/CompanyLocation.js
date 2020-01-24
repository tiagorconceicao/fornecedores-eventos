const { Model, DataTypes } = require('sequelize');

class CompanyLocation extends Model {
  static init(sequelize) {
    super.init({
      state: DataTypes.STRING(3),
      city: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'company_location',
    })
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'locations' });
  }

}

module.exports = CompanyLocation;