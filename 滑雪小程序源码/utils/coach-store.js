const { coaches } = require('./mock-data')

const JOIN_STORAGE_KEY = 'skigo_coach_join_records'

function getJoinedCoaches() {
  const records = wx.getStorageSync(JOIN_STORAGE_KEY)
  if (!Array.isArray(records)) return []
  return records.map(record => ({
    id: record.id,
    name: record.name,
    initial: record.name ? record.name.slice(0, 1) : '教',
    level: record.level,
    category: '雪场教练',
    price: 380,
    rating: 4.6,
    reviews: 0,
    years: Number(record.years || 0),
    resort: record.resort,
    skill: record.skill,
    teachTags: String(record.skill || '').split(/[、,，\s]+/).filter(Boolean).slice(0, 4),
    certificates: [record.certificate || record.level].filter(Boolean),
    certificate: record.certificate || record.level,
    intro: record.intro || '专注滑雪基础训练和雪场课程服务。',
    suitable: '入门体验、技术纠错、雪场陪滑',
    plan: '根据学员基础安排安全讲解、动作纠错和路线训练。',
    avatar: ''
  }))
}

function getCoaches() {
  return [...getJoinedCoaches(), ...coaches]
}

function getCoach(id) {
  return getCoaches().find(coach => coach.id === id) || getCoaches()[0]
}

module.exports = {
  getCoaches,
  getCoach
}
