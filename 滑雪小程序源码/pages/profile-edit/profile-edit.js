const userStore = require('../../utils/user-store')

Page({
  data: {
    nickname: '',
    level: ''
  },
  onLoad() {
    const profile = userStore.getProfile()
    this.setData({
      nickname: profile.nickname,
      level: profile.level
    })
  },
  onNicknameInput(event) {
    this.setData({ nickname: event.detail.value })
  },
  onLevelInput(event) {
    this.setData({ level: event.detail.value })
  },
  save() {
    const nickname = this.data.nickname.trim()
    if (!nickname) {
      wx.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    userStore.saveProfile({
      nickname,
      level: this.data.level.trim() || 'Lv.1 滑雪新手'
    })
    wx.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 500)
  }
})
