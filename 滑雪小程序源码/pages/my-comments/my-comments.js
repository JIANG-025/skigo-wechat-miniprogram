Page({
  data: {
    comments: []
  },
  onShow() {
    const comments = wx.getStorageSync('skigo_user_comments') || []
    this.setData({ comments })
  },
  goExplore() {
    wx.switchTab({ url: '/pages/community/community' })
  }
})
