const orderStore = require('../../utils/order-store')

Page({
  async submitOrder() {
    await orderStore.createOrder({
      type: '装备订单',
      title: '双板套装租赁',
      status: '待取件',
      price: 120
    })
    wx.showToast({ title: '租赁订单已创建', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 500)
  }
})
