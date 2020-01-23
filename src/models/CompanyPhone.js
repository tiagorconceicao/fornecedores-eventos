const { Model, DataTypes } = require('sequelize');

class CompanyPhone extends Model {
  static init(sequelize) {
    super.init({
      phone: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'company_phone',
    })
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'phones' });
  }

}

module.exports = CompanyPhone;