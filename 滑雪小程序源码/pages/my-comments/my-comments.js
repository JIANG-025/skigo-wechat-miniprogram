const commentStore = require('../../utils/comment-store')

Page({
  data: {
    comments: []
  },
  onShow() {
    this.setData({ comments: commentStore.getUserComments() })
  },
  goExplore() {
    wx.switchTab({ url: '/pages/community/community' })
  },
  deleteComment(event) {
    commentStore.deleteComment(event.currentTarget.dataset.id)
    this.setData({ comments: commentStore.getUserComments() })
  }
})
