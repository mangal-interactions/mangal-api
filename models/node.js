'use strict'

module.exports = function (sequelize, DataTypes) {
  var node = sequelize.define(
    'node',
    {
      original_name: {
        type: DataTypes.STRING,
        comment: 'Name of the recorded taxon in the publication',
        allowNull: false,
      },
      node_level: {
        type: DataTypes.ENUM,
        values: ['taxon', 'population', 'individual'],
        defaultValue: 'taxon',
        allowNull: false,
      },
      network_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxonomy_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  node.associate = function (models) {
    node.hasMany(models.interaction, {
      onDelete: 'cascade',
      foreignKey: 'node_from',
    })

    node.hasMany(models.interaction, {
      onDelete: 'cascade',
      foreignKey: 'node_to',
    })

    node.belongsTo(models.taxonomy, {
      foreignKey: 'taxonomy_id',
      targetKey: 'id',
    })

    node.hasMany(models.trait, {
      onDelete: 'cascade',
      foreignKey: 'node_id',
    })
  }
  return node
}
