const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'event',
    })
  }

  static associate(models) {
    this.hasMany(models.CompanyEvent, { foreignKey: 'event_id', as: 'companies' });
  }

}

module.exports = Event;