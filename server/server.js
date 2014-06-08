'use strict'

require('dotenv').load()

const bodyParser = require('body-parser')
const config = require('config')
const debug = require('debug')('ht:server')
const express = require('express')

const expressValidator = require('./common/middleware/express-validator')
const routes = require('./config/routes')

const app = express()

app.set('port', config.port)

app.use(bodyParser())
app.use(expressValidator())

routes.map(app)

app.listen(app.get('port'), function () {
  debug('Warm yourself by the hearth at port %s (%s)', app.get('port'), process.env.NODE_ENV)
})