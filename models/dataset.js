'use strict'

module.exports = function (sequelize, DataTypes) {
  var dataset = sequelize.define(
    'dataset',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the collected dataset',
      },
      description: {
        type: DataTypes.TEXT,
        comment: 'Description of the dataset collected',
        allowNull: false,
      },
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Is this available publicly? ',
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  dataset.associate = function (models) {
    dataset.hasMany(models.network, {
      onDelete: 'cascade',
    })
  }

  return dataset
}
