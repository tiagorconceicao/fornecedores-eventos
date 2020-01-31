const { Model, DataTypes } = require('sequelize');

class LogEmail extends Model {
  static init(sequelize) {
    super.init({
      subject: DataTypes.STRING,
      to_addresses: DataTypes.TEXT,
      cc_addresses: DataTypes.TEXT,
      bcc_addresses: DataTypes.TEXT,
      source: DataTypes.STRING,
      attachment: DataTypes.STRING,
      message_id: DataTypes.STRING,
      error: DataTypes.TEXT
    }, {
      sequelize,
      tableName: 'log_email',
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'email_logs' });
  }

}

module.exports = LogEmail;