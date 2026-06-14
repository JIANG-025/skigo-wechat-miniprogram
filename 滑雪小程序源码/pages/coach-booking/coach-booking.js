const coachStore = require('../../utils/coach-store')
const orderStore = require('../../utils/order-store')

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

Page({
  data: {
    coach: null,
    date: '',
    slots: ['09:00-11:00', '13:00-15:00', '15:00-17:00'],
    activeSlot: '09:00-11:00',
    lessonOptions: [1, 2, 3, 4],
    lessonIndex: 1,
    lessons: 2,
    note: '',
    total: 0
  },
  onLoad(options) {
    const coach = coachStore.getCoach(options.id)
    const nextDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
    this.setData({ coach, date: formatDate(nextDay) }, () => this.updateTotal())
  },
  chooseDate(event) {
    this.setData({ date: event.detail.value })
  },
  chooseSlot(event) {
    this.setData({ activeSlot: event.currentTarget.dataset.slot })
  },
  chooseLessons(event) {
    const lessonIndex = Number(event.detail.value)
    const lessons = this.data.lessonOptions[lessonIndex]
    this.setData({ lessonIndex, lessons }, () => this.updateTotal())
  },
  onNoteInput(event) {
    this.setData({ note: event.detail.value })
  },
  updateTotal() {
    const coach = this.data.coach
    if (!coach) return
    this.setData({ total: Number(coach.price || 0) * Number(this.data.lessons || 1) })
  },
  async submit() {
    const coach = this.data.coach
    await orderStore.createOrder({
      type: '教练订单',
      title: `${coach.name} ${this.data.lessons}课时`,
      status: '待确认',
      price: this.data.total,
      date: this.data.date,
      slot: this.data.activeSlot,
      note: this.data.note
    })
    wx.showToast({ title: '预约已提交', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/reservations/reservations' })
    }, 600)
  }
})
