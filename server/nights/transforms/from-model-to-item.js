const genId = require('../../common/data/id').gen
const itemKey = require('../night-key')

module.exports = function (model) {

  if (!model) return

  const item = itemKey(model.id || genId())

  item.subject = { S: model.subject }

  item.songs = { SS: model.songs }
  item.scriptures = { SS: model.scriptures }
  item.activities = { SS: model.activities }

  return item

}