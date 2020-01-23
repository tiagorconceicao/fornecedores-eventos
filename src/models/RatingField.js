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
    //this.belongsToMany(models.Company, { foreignKey: 'event_id', through: 'company_event' , as: 'companies' } );
  }

}

module.exports = RatingField;