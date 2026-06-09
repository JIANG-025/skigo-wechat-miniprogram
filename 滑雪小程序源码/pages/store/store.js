const { products } = require('../../utils/mock-data')

Page({
  data: {
    products
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${event.currentTarget.dataset.id}` })
  },
  goRental() {
    wx.navigateTo({ url: '/pages/rental/rental' })
  }
})
