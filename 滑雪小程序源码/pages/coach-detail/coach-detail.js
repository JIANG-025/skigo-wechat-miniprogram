const coachStore = require('../../utils/coach-store')
const favoriteStore = require('../../utils/favorite-store')
const commentStore = require('../../utils/comment-store')

Page({
  data: {
    coach: null,
    favorited: false,
    comments: [],
    commentContent: ''
  },
  onLoad(options) {
    const coach = coachStore.getCoach(options.id)
    this.setData({ coach })
    this.refreshFavorite(coach.id)
    this.loadComments(coach.id)
  },
  async refreshFavorite(id) {
    const favorited = await favoriteStore.isFavorited(id)
    this.setData({ favorited })
  },
  loadComments(id) {
    this.setData({ comments: commentStore.getTargetComments(id) })
  },
  onCommentInput(event) {
    this.setData({ commentContent: event.detail.value })
  },
  submitComment() {
    const content = this.data.commentContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' })
      return
    }
    const coach = this.data.coach
    commentStore.addComment({
      targetId: coach.id,
      targetTitle: coach.name,
      type: '教练',
      content
    })
    this.setData({ commentContent: '' })
    this.loadComments(coach.id)
    wx.showToast({ title: '评论成功', icon: 'success' })
  },
  deleteComment(event) {
    commentStore.deleteComment(event.currentTarget.dataset.id)
    this.loadComments(this.data.coach.id)
  },
  async toggleFavorite() {
    const coach = this.data.coach
    const result = await favoriteStore.toggleFavorite({
      targetId: coach.id,
      type: '教练',
      title: coach.name,
      desc: `${coach.resort} · ${coach.level} · ${coach.skill}`
    })
    this.setData({ favorited: result.favorited })
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消', icon: 'success' })
  },
  book() {
    wx.navigateTo({ url: `/pages/coach-booking/coach-booking?id=${this.data.coach.id}` })
  }
})
