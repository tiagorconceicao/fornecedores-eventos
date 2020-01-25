const { Model, DataTypes } = require('sequelize');

class CompanyEvent extends Model {
  static init(sequelize) {
    super.init({},
    {
      sequelize,
      tableName: 'company_event',
    })
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'events' });
    this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'companies' });
    this.hasMany(models.CompanyEventRating, { foreignKey: 'company_event_id', as: 'companyEvent_ratings' });
  }

}

module.exports = CompanyEvent;