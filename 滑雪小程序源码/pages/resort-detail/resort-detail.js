const { resorts } = require('../../utils/mock-data')
const favoriteStore = require('../../utils/favorite-store')
const commentStore = require('../../utils/comment-store')
const coachStore = require('../../utils/coach-store')

Page({
  data: {
    resort: null,
    favorited: false,
    platformCoaches: [],
    resortCoaches: [],
    comments: [],
    commentContent: ''
  },
  onLoad(options) {
    const resort = resorts.find(item => item.id === options.id) || resorts[0]
    const allCoaches = coachStore.getCoaches()
    const resortCoaches = allCoaches.filter(coach => (
      String(coach.resort || '').includes(resort.name) ||
      resort.name.includes(String(coach.resort || ''))
    ))
    this.setData({
      resort,
      platformCoaches: allCoaches.slice(0, 2),
      resortCoaches: resortCoaches.slice(0, 3)
    })
    this.refreshFavorite(resort.id)
    this.loadComments(resort.id)
  },
  async refreshFavorite(id) {
    const favorited = await favoriteStore.isFavorited(id)
    this.setData({ favorited })
  },
  bookTicket() {
    wx.navigateTo({ url: '/pages/ticket-booking/ticket-booking' })
  },
  goCoach(event) {
    wx.navigateTo({ url: `/pages/coach-detail/coach-detail?id=${event.currentTarget.dataset.id}` })
  },
  onCommentInput(event) {
    this.setData({ commentContent: event.detail.value })
  },
  loadComments(id) {
    this.setData({ comments: commentStore.getTargetComments(id) })
  },
  submitComment() {
    const content = this.data.commentContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' })
      return
    }
    const resort = this.data.resort
    commentStore.addComment({
      targetId: resort.id,
      targetTitle: resort.name,
      type: '雪场',
      content
    })
    this.setData({ commentContent: '' })
    this.loadComments(resort.id)
    wx.showToast({ title: '评论成功', icon: 'success' })
  },
  deleteComment(event) {
    commentStore.deleteComment(event.currentTarget.dataset.id)
    this.loadComments(this.data.resort.id)
  },
  async toggleFavorite() {
    const resort = this.data.resort
    const result = await favoriteStore.toggleFavorite({
      targetId: resort.id,
      type: '雪场',
      title: resort.name,
      desc: `${resort.location} · ${resort.feature}`
    })
    this.setData({ favorited: result.favorited })
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消', icon: 'success' })
  }
})
