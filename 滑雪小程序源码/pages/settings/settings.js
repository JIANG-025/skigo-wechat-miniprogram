const postStore = require('../../utils/post-store')
const orderStore = require('../../utils/order-store')
const favoriteStore = require('../../utils/favorite-store')

Page({
  data: {
    items: ['个人资料', '滑雪保险', '客服中心', '帮助中心', '隐私设置', '关于 SkiGo']
  },
  resetSampleData() {
    wx.showModal({
      title: '重置默认数据',
      content: '将恢复默认帖子、订单和收藏数据，是否继续？',
      success: async (res) => {
        if (!res.confirm) return
        wx.showLoading({ title: '重置中' })
        await Promise.all([
          postStore.resetPosts(),
          orderStore.resetOrders(),
          favoriteStore.resetFavorites()
        ])
        wx.hideLoading()
        wx.showToast({ title: '已重置', icon: 'success' })
      }
    })
  },
  testCloudLogin() {
    wx.showLoading({ title: '连接中' })
    wx.cloud.callFunction({
      name: 'login',
      success: (res) => {
        const openid = res.result && res.result.openid
        wx.showModal({
          title: '连接成功',
          content: openid ? `用户标识：${openid.slice(0, 8)}...` : '云函数已返回结果',
          showCancel: false
        })
      },
      fail: (error) => {
        wx.showModal({
          title: '连接失败',
          content: error.errMsg || '请确认 login 云函数已上传部署',
          showCancel: false
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})
