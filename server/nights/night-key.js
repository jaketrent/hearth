module.exports = function (id) {
  if (!id)
    throw new Error('INVALD_KEY: Item requires id')

  return {
    id: {
      S: id
    }
  }
}