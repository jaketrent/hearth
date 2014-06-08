/**
 * @class Error Transforms
 * @type {exports}
 */

const _ = require('lodash')

const isException = function (error) {
  return error && error.constructor && error.constructor.name.match(/.*?Error.*?/)
}

const wrapException = function (error) {
  const exception = {
    message: error.message,
    stack: error.stack
  }
  var prop = null
  for (prop in error) exception[prop] = error[prop]
  return { exception: exception }
}

/**
 * Formats errors for json serialization
 *
 * Combines errors from different sources:
 *
 * - errors in function argument
 * - errors in req.body.errors
 * - errors in req.validationErrors()
 *
 * @method toResponse (private)
 * @param errors {object/array} errors to serialize.  Can be:
 *
 * - Null (in which case, errors on req are serialized)
 * - Single error
 * - Array of errors
 * - Single Error object
 *
 * @param req {object} request object that can include req.body.errors and req.validationErrors()
 * @returns json {object}
 */
module.exports = function (errors, req) {
  const errorsIsReqParam = !req && !!errors && _.isFunction(errors.validationErrors)
  if (errorsIsReqParam) {
    req = errors
    errors = req.validationErrors()
  }

  const reqHasErrors = req && !!req.body && !!req.body.errors
  const reqHasValidationErrors = req && _.isFunction(req.validationErrors)

  if (!errors) return errors || reqHasErrors ? req.body.errors : errors

  var json = {
    errors: []
  }

  const reqErrors = reqHasErrors ? req.body.errors : []
  const reqValidationErrors = (!errorsIsReqParam && reqHasValidationErrors) ? req.validationErrors() : []
  errors = _.flatten([ errors, reqErrors, reqValidationErrors ], true)

  errors.map(function (err) {
    if (isException(err)) err = wrapException(err)
    json.errors.push(err)
  })

  return json
}