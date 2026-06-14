Page({
  data: {
    items: [
      { icon: '/images/icon-reservation.png', title: '我的预约', desc: '查看教练课程预约状态', url: '/pages/reservations/reservations' },
      { icon: '/images/icon-comment.png', title: '我的评论', desc: '查看在雪场和教练下的互动', url: '/pages/my-comments/my-comments' },
      { icon: '/images/icon-join.png', title: '教练入驻', desc: '提交教练资料和授课信息', url: '/pages/coach-join/coach-join' },
      { icon: '/images/icon-insurance.png', title: '滑雪保险', desc: '查看出行和训练保障方案', url: '/pages/insurance/insurance' },
      { icon: '/images/icon-help.png', title: '帮助中心', desc: '查看预订、收藏和安全说明', url: '/pages/help/help' },
      { icon: '/images/icon-service.png', title: '客服中心', desc: '处理订单和服务问题', url: '/pages/support/support' },
      { icon: '/images/icon-cert.png', title: '等级认证', desc: '查看滑雪能力等级', url: '/pages/certification/certification' }
    ]
  },
  goPage(event) {
    wx.navigateTo({ url: event.currentTarget.dataset.url })
  }
})
