'use strict'

module.exports = function (sequelize, DataTypes) {
  var network = sequelize.define(
    'network',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the collected network',
        unique: 'uq_network',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Collection date',
        unique: 'uq_network',
        //What should be the defaultValue? How to write a period?
      },
      geom: {
        type: DataTypes.GEOMETRY,
        comment:
          'Location (any features: point, multipolygons etc.) of the network',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Description of the network collected',
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Is this network is available publicly?',
      },
      all_interactions: {
        type: DataTypes.BOOLEAN,
        comment:
          'Is the network recording ALL presence AND absence of interactions',
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
      indexes: [
        {
          name: 'idx_network_date',
          method: 'BTREE',
          fields: ['date'],
        },
        {
          name: 'idx_network_name',
          method: 'BTREE',
          fields: ['name'],
        },
      ],
    },
  )

  network.associate = function (models) {
    network.hasMany(models.interaction, {
      onDelete: 'cascade',
    })
    network.hasMany(models.node, {
      onDelete: 'cascade',
    })
    network.hasMany(models.environment, {
      onDelete: 'cascade',
    })
  }

  return network
}
