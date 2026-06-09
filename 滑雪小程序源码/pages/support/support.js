Page({
  data: {
    items: [
      { title: '订单问题', desc: '雪票、酒店、装备和教练预约订单查询与处理。' },
      { title: '装备售后', desc: '装备租赁归还、押金、损坏说明和购买售后。' },
      { title: '雪场服务', desc: '雪道开放、交通接驳、储物柜和保险咨询。' }
    ]
  },
  contact() {
    wx.showModal({
      title: '客服提示',
      content: '当前可通过订单页面或帮助中心查看常见问题。',
      showCancel: false
    })
  }
})
