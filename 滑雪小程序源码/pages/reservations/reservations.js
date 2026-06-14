const orderStore = require('../../utils/order-store')

Page({
  data: {
    tabs: ['全部', '待确认', '已确认', '已完成'],
    activeTab: '全部',
    reservations: [],
    filteredReservations: []
  },
  onShow() {
    this.loadReservations()
  },
  async loadReservations() {
    const orders = await orderStore.getOrders()
    const reservations = orders.filter(order => order.type === '教练订单' || String(order.title || '').includes('教练'))
    this.setData({ reservations }, () => this.filterReservations())
  },
  chooseTab(event) {
    this.setData({ activeTab: event.currentTarget.dataset.tab }, () => this.filterReservations())
  },
  filterReservations() {
    const activeTab = this.data.activeTab
    const filteredReservations = activeTab === '全部'
      ? this.data.reservations
      : this.data.reservations.filter(item => item.status === activeTab)
    this.setData({ filteredReservations })
  },
  goCoaches() {
    wx.navigateTo({ url: '/pages/coaches/coaches' })
  }
})
