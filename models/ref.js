'use strict'

module.exports = function (sequelize, DataTypes) {
  var ref = sequelize.define(
    'ref',
    {
      doi: {
        type: DataTypes.STRING,
        comment: 'DOI of the attached publication',
      },
      /*  author: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'first author name',
      }, */
      year: {
        type: DataTypes.STRING,
        comment: 'year of publication',
      },
      jstor: {
        type: DataTypes.STRING,
        comment: 'JSTOR of the attached publication',
      },
      pmid: {
        type: DataTypes.STRING,
        comment: 'PMID of the attached publication',
      },
      bibtex: {
        type: DataTypes.TEXT,
        comment: 'BibTex of the attached publication',
      },
      paper_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        isUrl: true,
        comment: 'URL of the attached publication',
      },
      data_url: {
        type: DataTypes.TEXT,
        isUrl: true,
        allowNull: false,
        comment: 'URL of the attached data',
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {},
    },
  )

  ref.associate = function (models) {
    ref.hasMany(models.dataset, {
      onDelete: 'cascade',
    })
  }

  return ref
}
