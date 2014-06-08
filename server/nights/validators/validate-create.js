const _ = require('lodash')
const error = require('../../common/util/error')

module.exports = function (req) {
  if (!_.isObject(req.body.night)) {
    error.addToReq(req, 'night', 'Root attribute night is required', req.body.night)
    return false
  }

  req.checkBody(['night', 'subject'], 'Subject is required').notEmpty()
  req.checkBody(['night', 'songs'], 'Songs are required').notEmpty()
  req.checkBody(['night', 'scriptures'], 'Scriptures are required').notEmpty()
  req.checkBody(['night', 'activities'], 'Activities are required').notEmpty()

  return !req.validationErrors()
}