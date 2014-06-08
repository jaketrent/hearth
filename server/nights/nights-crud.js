const config = require('config')
const debug = require('debug')('ht:nights:crud')

const dynamo = require('../common/data/db')
const fromItemToModel = require('./transforms/from-item-to-model')
const fromItemsToModels = require('./transforms/from-items-to-models')
const fromModelToItem = require('./transforms/from-model-to-item')

exports.index = function (done) {
  dynamo.scan({
    TableName: config.table.nights
  }, function (err, data) {
    if (err) return done(err)

    done(null, fromItemsToModels(data.Items))
  })
}

exports.create = function (model, done) {
  const item = fromModelToItem(model)
  debug('Creating item: %j', item)
  dynamo.putItem({
    TableName: config.table.nights,
    Item: item
  }, function (err, data) {
    if (err) return done(err)

    done(null, fromItemToModel(item))
  })
}