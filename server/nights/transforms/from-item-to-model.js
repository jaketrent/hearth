module.exports = function (item) {
  return {
    id: item.id.S,
    subject: item.subject.S,
    songs: item.songs.SS,
    scriptures: item.scriptures.SS,
    activities: item.activities.SS
  }
}