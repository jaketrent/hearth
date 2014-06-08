const fromErrorstoJson = require('../common/transforms/from-errors-to-json')
const fromJsonToModel = require('./transforms/from-json-to-model')
const fromModelToJson = require('./transforms/from-model-to-json')
const fromModelsToJson = require('./transforms/from-models-to-json')
const validateCreate = require('./validators/validate-create')
const crud = require('./nights-crud')

exports.index = function (req, res) {
  crud.index(function (err, models) {
    if (err) return fromErrorstoJson(err, req)

    res.json(201, fromModelsToJson(models))
  })
}

exports.create = function (req, res) {
  if (validateCreate(req)) {
    crud.create(fromJsonToModel(req.body), function (err, model) {
      if (err) return fromErrorstoJson(err, req)

      res.json(201, fromModelToJson(model))
    })
  } else {
    res.json(400, fromErrorstoJson(req))
  }
}