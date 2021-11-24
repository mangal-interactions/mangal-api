'use strict'

module.exports = function (sequelize, DataTypes) {
  var trait = sequelize.define(
    'trait',
    {
      date: {
        type: DataTypes.DATEONLY,
        comment: 'When the trait has been measured',
        //What should be the defaultValue? How to write a period?
      },
      attr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          'Unique Identifier to retrieve the name of the attribute/trait measured',
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Value of the trait/attribute',
      },
      description: {
        type: DataTypes.TEXT,
        comment: 'Description of the measurement if relevant',
      },
    },
    {
      freezeTableName: true,
      classMethods: {},
    },
  )

  trait.associate = function (models) {
    trait.belongsTo(models.attribute, {
      foreignKey: 'attr_id',
      targetKey: 'id',
    })
  }
  return trait
}
