const favoriteStore = require('../../utils/favorite-store')

Page({
  data: {
    favorites: []
  },
  onShow() {
    this.loadFavorites()
  },
  async loadFavorites() {
    const favorites = await favoriteStore.getFavorites()
    this.setData({ favorites })
  }
})
