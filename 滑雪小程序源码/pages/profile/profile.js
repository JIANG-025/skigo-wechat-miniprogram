const orderStore = require('../../utils/order-store')
const favoriteStore = require('../../utils/favorite-store')
const userStore = require('../../utils/user-store')

function setTabBarSelected(page, selected) {
  if (typeof page.getTabBar === 'function' && page.getTabBar()) {
    page.getTabBar().setData({ selected, menuVisible: false })
  }
}

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
      { icon: '/images/icon-reservation.png', label: '我的预约', url: '/pages/reservations/reservations' },
      { icon: '/images/icon-order.png', label: '我的订单', url: '/pages/orders/orders' },
      { icon: '/images/icon-favorite.png', label: '我的收藏', url: '/pages/favorites/favorites' },
      { icon: '/images/icon-comment.png', label: '我的评论', url: '/pages/my-comments/my-comments' },
      { icon: '/images/icon-join.png', label: '教练入驻', url: '/pages/coach-join/coach-join' },
      { icon: '/images/icon-album.png', label: '滑雪相册', url: '/pages/album/album' },
      { icon: '/images/icon-diary.png', label: '滑雪日记', url: '/pages/diary/diary' },
      { icon: '/images/icon-cert.png', label: '等级认证', url: '/pages/certification/certification' },
      { icon: '/images/icon-service.png', label: '客服中心', url: '/pages/support/support' },
      { icon: '/images/icon-help.png', label: '帮助中心', url: '/pages/help/help' },
      { icon: '/images/icon-settings.png', label: '设置', url: '/pages/settings/settings' }
    ]
  },
  onShow() {
    setTabBarSelected(this, 4)
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
    const url = event.currentTarget.dataset.url
    if (url === '/pages/community/community') {
      wx.switchTab({ url })
      return
    }
    wx.navigateTo({ url })
  }
})
