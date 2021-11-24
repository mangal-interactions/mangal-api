'use strict'

module.exports = function (sequelize, DataTypes) {
  var environment = sequelize.define(
    'environment',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the environmentale variable collected',
        unique: 'uq_env_const',
      },
      date: {
        type: DataTypes.DATEONLY,
        comment: 'When the environmental variable has been measured',
        unique: 'uq_env_const',
        //What should be the defaultValue? How to write a period?
      },
      attr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          'Unique Identifier to retrieve the name of the attribute/variable measured',
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Value of the environmental/attribute',
        unique: 'uq_env_const',
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  environment.associate = function (models) {
    environment.belongsTo(models.attribute, {
      foreignKey: 'attr_id',
      targetKey: 'id',
    })
  }
  return environment
}
