const { Model, DataTypes } = require('sequelize');

class CompanyEmail extends Model {
  static init(sequelize) {
    super.init({
      email: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'company_email',
    })
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'emails' });
  }

}

module.exports = CompanyEmail;