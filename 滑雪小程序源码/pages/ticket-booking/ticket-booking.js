const orderStore = require('../../utils/order-store')

Page({
  data: {
    ticketTypes: ['全天票', '半天票', '夜场票'],
    activeType: '全天票'
  },
  chooseType(event) {
    this.setData({ activeType: event.currentTarget.dataset.type })
  },
  async submitOrder() {
    await orderStore.createOrder({
      type: '雪票订单',
      title: `崇礼云顶${this.data.activeType}`,
      status: '待使用',
      price: this.data.activeType === '全天票' ? 468 : 268
    })
    wx.showToast({ title: '订单已创建', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 500)
  }
})
