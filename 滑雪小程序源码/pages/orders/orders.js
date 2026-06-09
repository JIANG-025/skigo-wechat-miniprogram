const orderStore = require('../../utils/order-store')

Page({
  data: {
    orders: []
  },
  onShow() {
    this.loadOrders()
  },
  async loadOrders() {
    const orders = await orderStore.getOrders()
    this.setData({ orders })
  }
})
