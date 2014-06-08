'use strict'

const config = require('config')
const express = require('express')
const util = require('util')

const routes = require('./config/routes')

const app = express()

app.set('port', config.port)

routes.map(app)

app.listen(app.get('port'), function () {
  console.log(util.format('Warm yourself by the hearth at port %s (%s)', app.get('port'), process.env.NODE_ENV))
})