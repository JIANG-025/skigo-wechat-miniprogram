Page({
  data: {
    hotels: [
      { id: 'hotel-1', name: '云顶滑雪度假酒店', price: 688, desc: '距离雪道步行 5 分钟' },
      { id: 'hotel-2', name: '长白山温泉酒店', price: 599, desc: '含温泉和早餐' }
    ]
  },
  goDetail() {
    wx.navigateTo({ url: '/pages/hotel-detail/hotel-detail' })
  }
})
