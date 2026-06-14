const postStore = require('../../utils/post-store')

function setTabBarSelected(page, selected) {
  if (typeof page.getTabBar === 'function' && page.getTabBar()) {
    page.getTabBar().setData({ selected, menuVisible: false })
  }
}

Page({
  data: {
    posts: [],
    loading: false
  },
  onShow() {
    setTabBarSelected(this, 3)
    this.loadPosts()
  },
  async loadPosts() {
    this.setData({ loading: true })
    const posts = await postStore.getPosts()
    this.setData({ posts, loading: false })
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/post-detail/post-detail?id=${event.currentTarget.dataset.id}` })
  },
  async likePost(event) {
    const id = event.currentTarget.dataset.id
    const posts = await postStore.toggleLike(id)
    this.setData({ posts })
  },
  deletePost(event) {
    const id = event.currentTarget.dataset.id
    wx.showModal({
      title: '删除动态',
      content: '确认删除这条动态吗？',
      success: async (res) => {
        if (!res.confirm) return
        const posts = await postStore.deletePost(id)
        this.setData({ posts })
        wx.showToast({ title: '已删除', icon: 'success' })
      }
    })
  },
  goPublish() {
    wx.setStorageSync('skigo_open_publish_form', true)
    wx.switchTab({ url: '/pages/publish/publish' })
  }
})
