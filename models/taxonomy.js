'use strict'

module.exports = function (sequelize, DataTypes) {
  var taxonomy = sequelize.define(
    'taxonomy',
    {
      name: {
        type: DataTypes.STRING,
        comment: 'Scientific name of the recorded taxon',
        allowNull: false,
        unique: 'uq_name',
      },
      ncbi: {
        type: DataTypes.INTEGER,
        comment:
          'Unique Identifier from the National Center for Biotechnology Information',
      },
      tsn: {
        type: DataTypes.INTEGER,
        comment:
          'Unique identifier from the Integrated Taxonomic Information System',
      },
      eol: {
        type: DataTypes.INTEGER,
        comment: 'Unique identifier from the Encyclopedia of Life',
      },
      bold: {
        type: DataTypes.INTEGER,
        comment: 'Unique identifier from the Barcode of Life Database',
      },
      /*  gbif: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the GBIF infrastructure",
        }, 
      col: {
        type: DataTypes.STRING,
        comment: 'Unique identifier from the Catalog of Life infrastructure',
      },
      rank: {
        type: DataTypes.ENUM,
        comment: 'Taxonomic rank',
        values: [
          'kingdom',
          'subkingdom',
          'infrakingdom',
          'superdivision',
          'division',
          'subdivision',
          'phylum',
          'subclass',
          'class',
          'superorder',
          'order',
          'superfamily',
          'family',
          'genus',
          'subgenus',
          'species',
          'infraspecies',
        ],
      },*/
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  taxonomy.associate = function (models) {
    taxonomy.hasMany(models.node, {
      foreignKey: 'taxonomy_id',
    })
    taxonomy.hasMany(models.trait, {
      onDelete: 'cascade',
      foreignKey: 'taxonomy_id',
    })
  }
  return taxonomy
}
