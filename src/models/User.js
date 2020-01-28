const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSaltSync(10);
          user.password = await bcrypt.hashSync(user.password, salt);
        }
      },
    })
  }

  static associate(models) {
    //
  }

  static validate (model,password) {
    return bcrypt.compareSync(password, model.password);
  }
  
}

module.exports = User;