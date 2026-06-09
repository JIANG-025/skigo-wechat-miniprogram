const postStore = require('../../utils/post-store')

Page({
  data: {
    content: '',
    selectedResort: '崇礼云顶'
  },
  onInput(event) {
    this.setData({ content: event.detail.value })
  },
  async submitPost() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '请输入动态内容', icon: 'none' })
      return
    }
    await postStore.createPost({
      resort: this.data.selectedResort,
      content: this.data.content.trim()
    })
    wx.showToast({ title: '发布成功', icon: 'success' })
    this.setData({ content: '' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/community/community' })
    }, 500)
  }
})
