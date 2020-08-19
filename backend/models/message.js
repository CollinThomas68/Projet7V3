'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  Message.associate = function (models) {
 
    models.Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Message;
};