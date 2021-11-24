// List module dependancies
var express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
var http = require('http')
var db = require('./models')
var middlewares = require('./ressources/middlewares')

// Init express app
var app = express()

// Init all dependencies used by the app
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

process.env.NODE_ENV = 'development'

// Init Databases
if (process.env.NODE_ENV == 'development') {
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
    }),
  )
  //db.sequelize.sync({ force: false })
}

// Init REST ressources
require('./ressources').initialize(app)

// start server
var port = process.env.PORT_MANGAL_API || 3004
server = http.createServer(app)
server.listen(port)

module.exports = server
