const orderStore = require('../../utils/order-store')

Page({
  async submitOrder() {
    await orderStore.createOrder({
      type: '酒店订单',
      title: '云顶滑雪度假酒店',
      status: '待入住',
      price: 688
    })
    wx.showToast({ title: '酒店订单已创建', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 500)
  }
})
