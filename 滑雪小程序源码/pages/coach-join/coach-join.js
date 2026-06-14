const STORAGE_KEY = 'skigo_coach_join_records'

Page({
  data: {
    levels: ['国家一级教练', '国家二级教练', 'CASI Level 1', 'PSIA A级', '雪场认证教练'],
    resorts: ['崇礼云顶', '长白山万达', '新疆阿勒泰'],
    form: {
      name: '',
      phone: '',
      level: '',
      years: '',
      resort: '崇礼云顶',
      skill: '',
      certificate: '',
      intro: ''
    }
  },
  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({
      [`form.${field}`]: event.detail.value
    })
  },
  chooseLevel(event) {
    this.setData({ 'form.level': this.data.levels[Number(event.detail.value)] })
  },
  chooseResort(event) {
    this.setData({ 'form.resort': this.data.resorts[Number(event.detail.value)] })
  },
  submit() {
    const form = this.data.form
    if (!form.name || !form.phone || !form.level || !form.years || !form.skill) {
      wx.showToast({ title: '请完善必要信息', icon: 'none' })
      return
    }
    const records = wx.getStorageSync(STORAGE_KEY) || []
    records.unshift({
      ...form,
      id: `coach-join-${Date.now()}`,
      status: '已入驻',
      createdAt: Date.now()
    })
    wx.setStorageSync(STORAGE_KEY, records)
    wx.showToast({ title: '已提交', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 600)
  }
})
