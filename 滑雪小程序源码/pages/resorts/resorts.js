const { resorts } = require('../../utils/mock-data')

Page({
  data: {
    resorts
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/resort-detail/resort-detail?id=${event.currentTarget.dataset.id}` })
  }
})
