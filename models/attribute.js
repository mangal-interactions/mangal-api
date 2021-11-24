'use strict'

module.exports = function (sequelize, DataTypes) {
  var attribute = sequelize.define(
    'attribute',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the trait or environmental variable measured',
        unique: 'uq_name_unit_desc',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Description of the attribute',
        unique: 'uq_name_unit_desc',
      },
      unit: {
        type: DataTypes.STRING,
        comment: 'Unit of the attribute',
        defaultValue: 'None',
        unique: 'uq_name_unit_desc',
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  attribute.associate = function (models) {
    attribute.hasMany(models.environment, {
      onDelete: 'cascade',
      foreignKey: 'attr_id',
    })

    attribute.hasMany(models.interaction, {
      onDelete: 'cascade',
      foreignKey: 'attr_id',
    })

    attribute.hasMany(models.trait, {
      onDelete: 'cascade',
      foreignKey: 'attr_id',
    })
  }

  return attribute
}
