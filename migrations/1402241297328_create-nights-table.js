'use strict'

require('dotenv').load()
var config = require('config')

var dynamo = require('../server/common/data/db')
var table = require('./util/table')

exports.up = function (next) {
  dynamo.createTable({
    TableName: config.table.nights,
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  }, function (err, data) {
    table.handleCreate(err, data, next)
  })
}

exports.down = function (next) {
  dynamo.deleteTable({
    TableName: config.table.nights
  }, function (err, data) {
    table.handleDelete(err, data, next)
  })
}
