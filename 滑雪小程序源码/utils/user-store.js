const STORAGE_KEY = 'skigo_user_profile'

const defaultProfile = {
  nickname: '滑雪达人',
  level: 'Lv.8 雪场资深玩家',
  avatar: '/images/avatar-user-skier.jpg',
  initial: '雪'
}

function getProfile() {
  const stored = wx.getStorageSync(STORAGE_KEY)
  return stored && stored.nickname ? { ...defaultProfile, ...stored } : defaultProfile
}

function saveProfile(profile) {
  const nextProfile = {
    ...defaultProfile,
    ...profile,
    initial: (profile.nickname || defaultProfile.nickname).slice(0, 1)
  }
  wx.setStorageSync(STORAGE_KEY, nextProfile)
  return nextProfile
}

module.exports = {
  getProfile,
  saveProfile
}
