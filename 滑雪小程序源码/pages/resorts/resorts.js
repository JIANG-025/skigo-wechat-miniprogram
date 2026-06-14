const { resorts } = require('../../utils/mock-data')

function setTabBarSelected(page, selected) {
  if (typeof page.getTabBar === 'function' && page.getTabBar()) {
    page.getTabBar().setData({ selected, menuVisible: false })
  }
}

Page({
  data: {
    resorts,
    stats: [
      { value: '12+', label: '热门雪场' },
      { value: '48', label: '驻场教练' },
      { value: '3城', label: '覆盖区域' }
    ]
  },
  onShow() {
    setTabBarSelected(this, 1)
  },
  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/resort-detail/resort-detail?id=${event.currentTarget.dataset.id}` })
  }
})
