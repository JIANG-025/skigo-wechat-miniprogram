const { coaches } = require('../../utils/mock-data')

Page({
  data: {
    coaches
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/coach-detail/coach-detail?id=${event.currentTarget.dataset.id}` })
  }
})
