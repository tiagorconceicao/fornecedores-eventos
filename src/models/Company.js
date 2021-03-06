const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      description: DataTypes.STRING,
      website: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      complement: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'company',
    })
  }

  static associate(models) {
    this.hasMany(models.CompanyEmail, { foreignKey: 'company_id', as: 'emails' });
    this.hasMany(models.CompanyPhone, { foreignKey: 'company_id', as: 'phones' });
    this.hasMany(models.CompanyLocation, { foreignKey: 'company_id', as: 'locations' });
    this.belongsToMany(models.ServiceField, { foreignKey: 'company_id', through: 'company_service_field' , as: 'service_fields' } );
    this.hasMany(models.CompanyEvent, { foreignKey: 'company_id', as: 'events' });
    this.hasMany(models.CompanyMessage, { foreignKey: 'company_id', as: 'messages' });
  }

}

module.exports = Company;