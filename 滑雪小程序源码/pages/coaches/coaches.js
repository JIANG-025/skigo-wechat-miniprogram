const coachStore = require('../../utils/coach-store')

Page({
  data: {
    categories: ['全部', '国家教练', '雪场教练', '专业教练'],
    activeCategory: '全部',
    coaches: [],
    filteredCoaches: []
  },
  onShow() {
    const coaches = coachStore.getCoaches()
    this.setData({ coaches }, () => this.filterCoaches())
  },
  chooseCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.category }, () => this.filterCoaches())
  },
  filterCoaches() {
    const activeCategory = this.data.activeCategory
    const filteredCoaches = activeCategory === '全部'
      ? this.data.coaches
      : this.data.coaches.filter(coach => coach.category === activeCategory)
    this.setData({ filteredCoaches })
  },
  goDetail(event) {
    wx.navigateTo({ url: `/pages/coach-detail/coach-detail?id=${event.currentTarget.dataset.id}` })
  }
})
