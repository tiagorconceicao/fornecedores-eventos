const { Model, DataTypes } = require('sequelize');

class RatingField extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'rating_field',
    })
  }

  static associate(models) {
    this.hasMany(models.CompanyEventRating, { foreignKey: 'rating_field_id', as: 'company_event_ratings' });
  }

}

module.exports = RatingField;