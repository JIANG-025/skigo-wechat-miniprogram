const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('favorites')

const defaultFavorites = [
  { id: 'fav-1', targetId: 'resort-2', type: '雪场', title: '崇礼云顶', desc: '河北张家口 · 雪况优', createdAt: Date.now() - 300000 },
  { id: 'fav-2', targetId: 'product-1', type: '装备', title: '全能竞技滑雪板', desc: '装备商城 · 热销', createdAt: Date.now() - 600000 },
  { id: 'fav-3', targetId: 'post-1', type: '帖子', title: '崇礼云顶滑雪体验', desc: '收藏的社区攻略', createdAt: Date.now() - 900000 }
]

let collectionChecked = false

async function ensureCollection() {
  if (collectionChecked) return
  try {
    await db.createCollection('favorites')
  } catch (error) {
    // The collection already exists in normal use.
  }
  collectionChecked = true
}

function sortByCreatedAt(items) {
  return items.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
}

async function listFavorites(openid) {
  await ensureCollection()
  const result = await collection.where({ ownerOpenid: openid }).limit(50).get()
  if (result.data.length > 0) return sortByCreatedAt(result.data)

  const seededFavorites = defaultFavorites.map(favorite => ({
    ...favorite,
    ownerOpenid: openid
  }))
  await Promise.all(seededFavorites.map(favorite => collection.add({ data: favorite })))
  return sortByCreatedAt(seededFavorites)
}

async function isFavorited(targetId, openid) {
  await ensureCollection()
  const result = await collection.where({ ownerOpenid: openid, targetId }).limit(1).get()
  return result.data.length > 0
}

async function toggleFavorite(event, openid) {
  await ensureCollection()
  const item = event.item || {}
  const targetId = item.targetId
  const existed = await collection.where({ ownerOpenid: openid, targetId }).limit(10).get()
  if (existed.data.length > 0) {
    await Promise.all(existed.data.map(favorite => collection.doc(favorite._id).remove()))
    return {
      favorited: false,
      favorites: await listFavorites(openid)
    }
  }

  const favorite = {
    id: `fav-${Date.now()}`,
    ownerOpenid: openid,
    createdAt: Date.now(),
    targetId,
    type: item.type || '收藏',
    title: item.title || '收藏内容',
    desc: item.desc || ''
  }
  await collection.add({ data: favorite })
  return {
    favorited: true,
    favorites: await listFavorites(openid)
  }
}

async function resetFavorites(openid) {
  await ensureCollection()
  const oldFavorites = await collection.where({ ownerOpenid: openid }).limit(100).get()
  await Promise.all(oldFavorites.data.map(favorite => collection.doc(favorite._id).remove()))
  const seededFavorites = defaultFavorites.map(favorite => ({
    ...favorite,
    ownerOpenid: openid
  }))
  await Promise.all(seededFavorites.map(favorite => collection.add({ data: favorite })))
  return sortByCreatedAt(seededFavorites)
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action

  if (action === 'list') return { favorites: await listFavorites(OPENID) }
  if (action === 'isFavorited') return { favorited: await isFavorited(event.targetId, OPENID) }
  if (action === 'toggle') return await toggleFavorite(event, OPENID)
  if (action === 'reset') return { favorites: await resetFavorites(OPENID) }

  throw new Error(`Unknown action: ${action}`)
}
