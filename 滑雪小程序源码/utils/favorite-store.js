const STORAGE_KEY = 'skigo_demo_favorites'
const CLOUD_FUNCTION = 'favoriteService'

const defaultFavorites = [
  { id: 'fav-1', targetId: 'resort-demo', type: '雪场', title: '阿尔卑斯雪场', desc: '瑞士 · 高级雪道' },
  { id: 'fav-2', targetId: 'product-demo', type: '装备', title: '专业滑雪套装', desc: '顶级品牌 · 全地形适用' },
  { id: 'fav-3', targetId: 'post-demo', type: '帖子', title: '长白山滑雪攻略', desc: '收藏的社区攻略' }
]

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function hasCloud() {
  return Boolean(wx.cloud && wx.cloud.callFunction)
}

function getLocalFavorites() {
  const stored = wx.getStorageSync(STORAGE_KEY)
  if (Array.isArray(stored)) return stored
  const initialFavorites = clone(defaultFavorites)
  wx.setStorageSync(STORAGE_KEY, initialFavorites)
  return initialFavorites
}

function saveLocalFavorites(favorites) {
  wx.setStorageSync(STORAGE_KEY, favorites)
  return favorites
}

async function callCloud(action, data = {}) {
  if (!hasCloud()) throw new Error('Cloud is unavailable')
  try {
    const result = await wx.cloud.callFunction({
      name: CLOUD_FUNCTION,
      data: {
        action,
        ...data
      }
    })
    return result.result || {}
  } catch (error) {
    console.warn(`[favoriteService:${action}] cloud call failed`, error)
    throw error
  }
}

async function getFavorites() {
  try {
    const result = await callCloud('list')
    if (Array.isArray(result.favorites)) return result.favorites
  } catch (error) {
    console.warn('favoriteService list fallback to local storage')
  }
  return getLocalFavorites()
}

async function isFavorited(targetId) {
  try {
    const result = await callCloud('isFavorited', { targetId })
    if (typeof result.favorited === 'boolean') return result.favorited
  } catch (error) {
    console.warn('favoriteService isFavorited fallback to local storage')
  }
  return getLocalFavorites().some(item => item.targetId === targetId)
}

async function toggleFavorite(item) {
  try {
    const result = await callCloud('toggle', { item })
    if (typeof result.favorited === 'boolean') return result
  } catch (error) {
    console.warn('favoriteService toggle fallback to local storage')
  }
  const favorites = getLocalFavorites()
  const exists = favorites.some(favorite => favorite.targetId === item.targetId)
  if (exists) {
    return {
      favorited: false,
      favorites: saveLocalFavorites(favorites.filter(favorite => favorite.targetId !== item.targetId))
    }
  }
  const favorite = {
    id: `fav-${Date.now()}`,
    ...item
  }
  return {
    favorited: true,
    favorites: saveLocalFavorites([favorite, ...favorites])
  }
}

async function resetFavorites() {
  try {
    const result = await callCloud('reset')
    if (Array.isArray(result.favorites)) return result.favorites
  } catch (error) {
    console.warn('favoriteService reset fallback to local storage')
  }
  return saveLocalFavorites(clone(defaultFavorites))
}

module.exports = {
  getFavorites,
  isFavorited,
  toggleFavorite,
  resetFavorites
}
