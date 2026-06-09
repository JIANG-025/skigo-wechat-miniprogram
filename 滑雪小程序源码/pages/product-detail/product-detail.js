const { products } = require('../../utils/mock-data')
const orderStore = require('../../utils/order-store')
const favoriteStore = require('../../utils/favorite-store')

Page({
  data: {
    product: null,
    favorited: false
  },
  onLoad(options) {
    const product = products.find(item => item.id === options.id) || products[0]
    this.setData({ product })
    this.refreshFavorite(product.id)
  },
  async refreshFavorite(id) {
    const favorited = await favoriteStore.isFavorited(id)
    this.setData({ favorited })
  },
  async buy() {
    await orderStore.createOrder({
      type: '装备订单',
      title: this.data.product.name,
      status: '待发货',
      price: this.data.product.price
    })
    wx.showToast({ title: '装备订单已创建', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 500)
  },
  async toggleFavorite() {
    const product = this.data.product
    const result = await favoriteStore.toggleFavorite({
      targetId: product.id,
      type: '装备',
      title: product.name,
      desc: `¥${product.price} · ${product.tag}`
    })
    this.setData({ favorited: result.favorited })
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消', icon: 'success' })
  }
})
