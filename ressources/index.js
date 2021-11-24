var epilogue = require('epilogue')
var db = require('../models')
var middlewares = require('./middlewares')
epilogue = require('finale-rest')

// Init Epilogue
var initialize = function (app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
  })

  // Create REST resources
  var attributeResource = epilogue.resource({
    model: db.attribute,
    endpoints: ['/api/v2/attribute', '/api/v2/attribute/:id'],
  })

  var refResource = epilogue.resource({
    model: db.ref,
    endpoints: ['/api/v2/reference', '/api/v2/reference/:id'],
  })

  var userResource = epilogue.resource({
    model: db.users,
    endpoints: ['/api/v2/user', '/api/v2/user/:id'],
    excludeAttributes: ['access_token', 'type'],
  })

  var traitResource = epilogue.resource({
    model: db.trait,
    endpoints: ['/api/v2/trait', '/api/v2/trait/:id'],
    include: [
      {
        model: db.attribute,
      },
    ],
  })

  var environmentResource = epilogue.resource({
    model: db.environment,
    endpoints: ['/api/v2/environment', '/api/v2/environment/:id'],
    include: [
      {
        model: db.attribute,
        as: 'attribute',
      },
    ],
  })

  var nodeResource = epilogue.resource({
    model: db.node,
    endpoints: ['/api/v2/node', '/api/v2/node/:id'],
    include: [
      {
        model: db.taxonomy,
      },
    ],
  })

  var datasetResource = epilogue.resource({
    model: db.dataset,
    endpoints: ['/api/v2/dataset', '/api/v2/dataset/:id'],
  })

  var networkResource = epilogue.resource({
    model: db.network,
    endpoints: ['/api/v2/network', '/api/v2/network/:id'],
  })

  var interactionResource = epilogue.resource({
    model: db.interaction,
    endpoints: ['/api/v2/interaction', '/api/v2/interaction/:id'],
    include: [
      {
        model: db.attribute,
      },
    ],
  })

  var taxonomyResource = epilogue.resource({
    model: db.taxonomy,
    endpoints: ['/api/v2/taxonomy', '/api/v2/taxonomy/:id'],
  })

  // Protections ressources with middlewares
  attributeResource.use(middlewares)
  refResource.use(middlewares)
  userResource.use(middlewares)
  traitResource.use(middlewares)
  environmentResource.use(middlewares)
  nodeResource.use(middlewares)
  datasetResource.use(middlewares)
  networkResource.use(middlewares)
  interactionResource.use(middlewares)
  taxonomyResource.use(middlewares)
}

module.exports = {
  initialize: initialize,
}
