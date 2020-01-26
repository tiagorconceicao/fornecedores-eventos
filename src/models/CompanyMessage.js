const { Model, DataTypes } = require('sequelize');

class CompanyMessage extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      message: DataTypes.TEXT,
      fixed: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'company_message',
    })
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'messages' });
  }

}

module.exports = CompanyMessage;