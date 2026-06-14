const allResults = [
  { title: '崇礼云顶', type: '雪场', desc: '奥运场地，适合中高级训练', url: '/pages/resort-detail/resort-detail?id=resort-2' },
  { title: '长白山万达', type: '雪场', desc: '天然粉雪，适合度假滑雪', url: '/pages/resort-detail/resort-detail?id=resort-1' },
  { title: '云顶滑雪度假酒店', type: '酒店', desc: '雪场周边住宿', url: '/pages/hotel-detail/hotel-detail' },
  { title: '全能竞技滑雪板', type: '装备', desc: '热门滑雪装备', url: '/pages/product-detail/product-detail?id=product-1' },
  { title: 'Sarah Li 私教课', type: '教练', desc: '零基础启蒙与单板训练', url: '/pages/coach-detail/coach-detail?id=coach-2' }
]

Page({
  data: {
    keyword: '',
    hotWords: ['崇礼云顶', '长白山万达', '滑雪板', '教练预约'],
    recommendTip: '可以搜索“新手”“滑雪板”“崇礼”等关键词，系统会推荐合适的服务。',
    results: allResults
  },
  onInput(event) {
    this.updateSearch(event.detail.value)
  },
  chooseWord(event) {
    this.updateSearch(event.currentTarget.dataset.word)
  },
  updateSearch(keyword) {
    const text = keyword.trim()
    const results = text
      ? allResults.filter(item => `${item.title}${item.type}${item.desc}`.includes(text))
      : allResults
    this.setData({
      keyword: text,
      results,
      recommendTip: this.getRecommendTip(text, results)
    })
  },
  getRecommendTip(keyword, results) {
    if (!keyword) return '可以搜索“新手”“滑雪板”“崇礼”等关键词，系统会推荐合适的服务。'
    if (keyword.includes('新手')) return '新手建议优先选择教练课程、平缓雪道和单日保险。'
    if (keyword.includes('装备') || keyword.includes('滑雪板')) return '根据搜索内容，推荐先查看装备商城和装备租赁服务。'
    if (results.length > 0) return `已根据“${keyword}”匹配到 ${results.length} 条相关内容。`
    return '暂未匹配到内容，可尝试输入雪场、酒店、装备或教练名称。'
  },
  goPage(event) {
    wx.navigateTo({ url: event.currentTarget.dataset.url })
  }
})
