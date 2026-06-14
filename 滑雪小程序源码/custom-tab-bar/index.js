Component({
  data: {
    selected: 0,
    menuVisible: false,
    list: [
      { pagePath: '/pages/home/home', text: '首页', icon: '/images/tab-home.png', activeIcon: '/images/tab-home-active.png' },
      { pagePath: '/pages/resorts/resorts', text: '雪场', icon: '/images/tab-resort.png', activeIcon: '/images/tab-resort-active.png' },
      { pagePath: '/pages/publish/publish', text: '发布', center: true },
      { pagePath: '/pages/community/community', text: '社区', icon: '/images/tab-community.png', activeIcon: '/images/tab-community-active.png' },
      { pagePath: '/pages/profile/profile', text: '我的', icon: '/images/tab-profile.png', activeIcon: '/images/tab-profile-active.png' }
    ],
    quickActions: [
      { icon: '/images/icon-coach.png', title: '预约教练', desc: '选择教练与课程', url: '/pages/coaches/coaches' },
      { icon: '/images/icon-reservation.png', title: '我的预约', desc: '查看课程状态', url: '/pages/reservations/reservations' },
      { icon: '/images/icon-join.png', title: '教练入驻', desc: '提交授课资料', url: '/pages/coach-join/coach-join' },
      { icon: '/images/icon-diary.png', title: '发布动态', desc: '分享今日雪况', action: 'publish' }
    ]
  },
  methods: {
    switchTab(event) {
      const index = Number(event.currentTarget.dataset.index)
      const item = this.data.list[index]
      if (!item) return
      if (item.center) {
        this.setData({ menuVisible: !this.data.menuVisible })
        return
      }
      this.setData({ menuVisible: false })
      wx.switchTab({ url: item.pagePath })
    },
    closeMenu() {
      this.setData({ menuVisible: false })
    },
    tapQuickAction(event) {
      const item = this.data.quickActions[Number(event.currentTarget.dataset.index)]
      if (!item) return
      this.setData({ menuVisible: false })
      if (item.action === 'publish') {
        wx.setStorageSync('skigo_open_publish_form', true)
        wx.switchTab({ url: '/pages/publish/publish' })
        return
      }
      wx.navigateTo({ url: item.url })
    }
  }
})
