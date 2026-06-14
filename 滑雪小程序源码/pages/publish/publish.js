const postStore = require('../../utils/post-store')

Page({
  data: {
    content: '',
    selectedResort: '崇礼云顶',
    quickActions: [
      { icon: '/images/icon-coach.png', title: '预约教练', desc: '选择教练和上课时间', url: '/pages/coaches/coaches' },
      { icon: '/images/icon-reservation.png', title: '我的预约', desc: '查看教练预约状态', url: '/pages/reservations/reservations' },
      { icon: '/images/icon-join.png', title: '教练入驻', desc: '填写资料申请入驻', url: '/pages/coach-join/coach-join' },
      { icon: '/images/icon-community.png', title: '滑雪社区', desc: '浏览雪友动态和评论', url: '/pages/community/community', tab: true }
    ]
  },
  goAction(event) {
    const { url, tab } = event.currentTarget.dataset
    if (tab) {
      wx.switchTab({ url })
      return
    }
    wx.navigateTo({ url })
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
      wx.switchTab({ url: '/pages/community/community' })
    }, 500)
  }
})
