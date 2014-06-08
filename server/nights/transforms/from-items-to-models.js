const fromItemToModel = require('./from-item-to-model')

module.exports = function (items) {
  if (!items) return

  return items.map(fromItemToModel)
}