'use strict'

const index = require('../common/controllers/index')

exports.map = function (app) {

  app.get('/', index.index)

}