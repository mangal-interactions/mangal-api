'use strict'

var fs = require('fs')
var path = require('path')
const cls = require('cls-hooked')
const namespace = cls.createNamespace('....')
var Sequelize = require('sequelize')
Sequelize.useCLS(namespace)
var basename = path.basename(module.filename)
var env = process.env.NODE_ENV || 'development'
var config = require(__dirname + '/../config/db.json')[env]
var db = {}
const relations = require('./relations')

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  )
}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'relations.js' &&
      file !== basename &&
      file.slice(-3) === '.js'
    )
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    )
    db[model.name] = model
  })

// relations
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
