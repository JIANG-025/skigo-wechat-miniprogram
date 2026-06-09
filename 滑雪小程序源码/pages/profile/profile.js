const orderStore = require('../../utils/order-store')
const favoriteStore = require('../../utils/favorite-store')
const userStore = require('../../utils/user-store')

Page({
  data: {
    profile: userStore.getProfile(),
    orderCount: 0,
    favoriteCount: 0,
    recentOrders: [],
    recentFavorites: [],
    stats: [
      { label: '滑雪次数', value: 128 },
      { label: '雪场打卡', value: 56 },
      { label: '累计雪时', value: 896 }
    ],
    menus: [
      { label: '我的订单', url: '/pages/orders/orders' },
      { label: '我的收藏', url: '/pages/favorites/favorites' },
      { label: '滑雪相册', url: '/pages/album/album' },
      { label: '滑雪日记', url: '/pages/diary/diary' },
      { label: '等级认证', url: '/pages/certification/certification' },
      { label: '客服中心', url: '/pages/support/support' },
      { label: '帮助中心', url: '/pages/help/help' },
      { label: '设置', url: '/pages/settings/settings' }
    ]
  },
  onShow() {
    this.loadProfileData()
  },
  async loadProfileData() {
    const [orders, favorites] = await Promise.all([
      orderStore.getOrders(),
      favoriteStore.getFavorites()
    ])
    this.setData({
      profile: userStore.getProfile(),
      orderCount: orders.length,
      favoriteCount: favorites.length,
      recentOrders: orders.slice(0, 2),
      recentFavorites: favorites.slice(0, 2)
    })
  },
  editProfile() {
    wx.navigateTo({ url: '/pages/profile-edit/profile-edit' })
  },
  goPage(event) {
    wx.navigateTo({ url: event.currentTarget.dataset.url })
  }
})
