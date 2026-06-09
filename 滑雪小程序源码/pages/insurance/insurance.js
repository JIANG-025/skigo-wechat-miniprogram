Page({
  data: {
    plans: [
      { name: '单日滑雪保障', price: 18, desc: '适合单日雪票、入门训练和短途滑雪。' },
      { name: '进阶训练保障', price: 36, desc: '适合教练课程、装备租赁和中高级雪道训练。' },
      { name: '滑雪旅行保障', price: 68, desc: '适合酒店住宿、跨城滑雪和多日行程。' }
    ]
  },
  choose(event) {
    wx.showToast({ title: event.currentTarget.dataset.name, icon: 'none' })
  }
})
