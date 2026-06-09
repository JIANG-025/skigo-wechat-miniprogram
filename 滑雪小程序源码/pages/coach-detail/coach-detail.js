const { coaches } = require('../../utils/mock-data')
const orderStore = require('../../utils/order-store')

Page({
  data: {
    coach: null
  },
  onLoad(options) {
    const coach = coaches.find(item => item.id === options.id) || coaches[0]
    this.setData({ coach })
  },
  async book() {
    await orderStore.createOrder({
      type: '教练订单',
      title: `${this.data.coach.name} 私教课`,
      status: '待确认',
      price: this.data.coach.price
    })
    wx.showToast({ title: '教练预约已创建', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 500)
  }
})
