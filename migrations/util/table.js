var debug = require('debug')('ht:migrations')

exports.handleCreate = function (err, data, next) {
  if (err) {
    if (err.code == 'ResourceInUseException'
      && (err.message.indexOf('Duplicate') > -1 || err.message.indexOf('being created') > -1 )) {
      // ok, already setup
    } else {
      debug('%j', err); throw err
    }
  } else {
    debug('[' + data.TableDescription.TableStatus + '] ' + data.TableDescription.TableName)
  }
  next()
}

exports.handleDelete = function (err, data, next) {
  if (err) {
    if (err.code == 'ResourceNotFoundException') {
      // ok, already deleted
    } else {
      debug('%j', err); throw err
    }
  } else {
    debug('[' + data.TableDescription.TableStatus + '] ' + data.TableDescription.TableName)
  }
  next()
}