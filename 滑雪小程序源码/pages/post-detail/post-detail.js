const postStore = require('../../utils/post-store')
const favoriteStore = require('../../utils/favorite-store')

Page({
  data: {
    id: '',
    post: null,
    commentContent: '',
    favorited: false
  },
  onLoad(options) {
    this.setData({ id: options.id || '' })
  },
  onShow() {
    this.refreshPost()
  },
  async refreshPost() {
    const post = await postStore.getPost(this.data.id)
    if (!post) {
      wx.showToast({ title: '动态不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    const favorited = await favoriteStore.isFavorited(post.id)
    this.setData({ post, favorited })
  },
  onCommentInput(event) {
    this.setData({ commentContent: event.detail.value })
  },
  async likePost() {
    await postStore.toggleLike(this.data.id)
    this.refreshPost()
  },
  async submitComment() {
    const content = this.data.commentContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' })
      return
    }
    const post = await postStore.addComment(this.data.id, content)
    this.setData({
      post,
      commentContent: ''
    })
    wx.showToast({ title: '评论成功', icon: 'success' })
  },
  async toggleFavorite() {
    const post = this.data.post
    const result = await favoriteStore.toggleFavorite({
      targetId: post.id,
      type: '帖子',
      title: post.content.slice(0, 16),
      desc: `${post.author} · ${post.resort}`
    })
    this.setData({ favorited: result.favorited })
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消', icon: 'success' })
  }
})
