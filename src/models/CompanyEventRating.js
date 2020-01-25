const { Model, DataTypes } = require('sequelize');

class CompanyEventRating extends Model {
  static init(sequelize) {
    super.init({
      score: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: 'company_event_rating',
    })
  }

  static associate(models) {
    this.belongsTo(models.CompanyEvent, { foreignKey: 'company_event_id', as: 'company_event' });
    this.belongsTo(models.RatingField, { foreignKey: 'rating_field_id', as: 'rating_field' });
  }

}

module.exports = CompanyEventRating;