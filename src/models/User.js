const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      admin: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'user',
    })
  }

  static associate(models) {
    //
  }
}

module.exports = User;