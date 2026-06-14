const { resorts, products, coaches, posts } = require('../../utils/mock-data')
const weatherStore = require('../../utils/weather-store')

Page({
  data: {
    banners: [
      { title: '这个冬天，畅滑每一座雪山', desc: '今日雪况优', image: '/images/hero-snow-mountain.png', url: '/pages/resorts/resorts' },
      { title: '崇礼云顶雪道开放', desc: '奥运场地 设施齐全', image: '/images/resort-chongli.png', url: '/pages/resort-detail/resort-detail?id=resort-2' },
      { title: '长白山粉雪季', desc: '雪票 ¥380 起', image: '/images/resort-changbai.png', url: '/pages/resort-detail/resort-detail?id=resort-1' }
    ],
    weatherTabs: ['天气', '雪况'],
    activeWeatherTab: 0,
    activeWeatherResortIndex: 0,
    selectedWeatherResort: resorts[0],
    selectedWeather: weatherStore.normalizeWeather(weatherStore.formatLocalWeather(resorts[0])),
    weatherCache: {},
    weatherLoading: false,
    navActions: [
      { icon: '/images/icon-ticket.png', label: '雪场订票', url: '/pages/ticket-booking/ticket-booking' },
      { icon: '/images/icon-hotel.png', label: '酒店预定', url: '/pages/hotels/hotels' },
      { icon: '/images/icon-rental.png', label: '装备租赁', url: '/pages/rental/rental' },
      { icon: '/images/icon-store.png', label: '装备购买', url: '/pages/store/store' },
      { icon: '/images/icon-coach.png', label: '预约教练', url: '/pages/coaches/coaches' },
      { icon: '/images/icon-community.png', label: '滑雪社区', url: '/pages/community/community' },
      { icon: '/images/icon-insurance.png', label: '购买保险', url: '/pages/insurance/insurance' },
      { icon: '/images/icon-more.png', label: '更多功能', url: '/pages/more/more' }
    ],
    resorts,
    products,
    coaches,
    posts
  },
  onLoad() {
    this.loadWeather(resorts[0])
  },
  switchWeather(event) {
    this.setData({
      activeWeatherTab: Number(event.currentTarget.dataset.index)
    })
  },
  chooseWeatherResort(event) {
    const index = Number(event.currentTarget.dataset.index)
    const resort = this.data.resorts[index]
    this.setData({
      activeWeatherResortIndex: index,
      selectedWeatherResort: resort,
      selectedWeather: this.data.weatherCache[resort.id] || weatherStore.normalizeWeather(weatherStore.formatLocalWeather(resort))
    })
    this.loadWeather(resort)
  },
  async loadWeather(resort) {
    if (!resort || this.data.weatherLoading) return
    if (this.data.weatherCache[resort.id]) return
    this.setData({ weatherLoading: true })
    const weather = await weatherStore.fetchWeather(resort)
    const nextCache = {
      ...this.data.weatherCache,
      [resort.id]: weather
    }
    if (this.data.selectedWeatherResort.id !== resort.id) {
      this.setData({
        weatherLoading: false,
        weatherCache: nextCache
      })
      return
    }
    this.setData({
      weatherLoading: false,
      selectedWeather: weather,
      weatherCache: nextCache
    })
  },
  refreshWeather() {
    const resort = this.data.selectedWeatherResort
    if (!resort) return
    this.setData({
      weatherCache: {
        ...this.data.weatherCache,
        [resort.id]: null
      }
    })
    this.loadWeather(resort)
  },
  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },
  goBanner(event) {
    const url = event.currentTarget.dataset.url
    if (!url) return
    if (url === '/pages/resorts/resorts') {
      wx.switchTab({ url })
      return
    }
    wx.navigateTo({ url })
  },
  goPage(event) {
    const url = event.currentTarget.dataset.url
    const tabPages = [
      '/pages/home/home',
      '/pages/resorts/resorts',
      '/pages/publish/publish',
      '/pages/community/community',
      '/pages/profile/profile'
    ]
    if (tabPages.includes(url)) {
      wx.switchTab({ url })
      return
    }
    wx.navigateTo({ url })
  },
  goResortDetail(event) {
    wx.navigateTo({ url: `/pages/resort-detail/resort-detail?id=${event.currentTarget.dataset.id}` })
  },
  goProductDetail(event) {
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${event.currentTarget.dataset.id}` })
  },
  goCoachDetail(event) {
    wx.navigateTo({ url: `/pages/coach-detail/coach-detail?id=${event.currentTarget.dataset.id}` })
  }
})
