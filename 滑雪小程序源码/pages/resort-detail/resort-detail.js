const { resorts, coaches } = require('../../utils/mock-data')
const favoriteStore = require('../../utils/favorite-store')

Page({
  data: {
    resort: null,
    favorited: false,
    platformCoaches: [],
    resortCoaches: []
  },
  onLoad(options) {
    const resort = resorts.find(item => item.id === options.id) || resorts[0]
    this.setData({
      resort,
      platformCoaches: coaches.slice(0, 2),
      resortCoaches: coaches.slice(1, 3)
    })
    this.refreshFavorite(resort.id)
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
