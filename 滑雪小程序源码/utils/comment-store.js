const STORAGE_KEY = 'skigo_user_comments'

function getComments() {
  const comments = wx.getStorageSync(STORAGE_KEY)
  return Array.isArray(comments) ? comments : []
}

function saveComments(comments) {
  wx.setStorageSync(STORAGE_KEY, comments)
  return comments
}

function formatTime() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}

function getTargetComments(targetId) {
  return getComments().filter(comment => comment.targetId === targetId)
}

function getUserComments() {
  return getComments()
}

function addComment({ targetId, targetTitle, type, content }) {
  const comment = {
    id: `comment-${Date.now()}`,
    targetId,
    targetTitle,
    type,
    content,
    author: '我',
    createdAt: Date.now(),
    createdAtText: formatTime()
  }
  return saveComments([comment, ...getComments()])
}

function deleteComment(id) {
  return saveComments(getComments().filter(comment => comment.id !== id))
}

module.exports = {
  getTargetComments,
  getUserComments,
  addComment,
  deleteComment
}
