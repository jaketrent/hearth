'use strict'

const index = require('../common/controllers/index')
const nights = require('../nights/nights-ctrl')

exports.map = function (app) {

  app.get('/', index.index)

  app.get('/api/v1/nights', nights.index)
  app.post('/api/v1/nights', nights.create)

}