const STORAGE_KEY = 'skigo_local_favorites'
const CLOUD_FUNCTION = 'favoriteService'

const defaultFavorites = [
  { id: 'fav-1', targetId: 'resort-2', type: '雪场', title: '崇礼云顶', desc: '河北张家口 · 雪况优' },
  { id: 'fav-2', targetId: 'product-1', type: '装备', title: '全能竞技滑雪板', desc: '装备商城 · 热销' },
  { id: 'fav-3', targetId: 'post-1', type: '帖子', title: '崇礼云顶滑雪体验', desc: '收藏的社区攻略' }
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
