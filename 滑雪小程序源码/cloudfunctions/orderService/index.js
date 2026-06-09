const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('orders')

const defaultOrders = [
  { id: 'order-1', type: '雪票订单', title: '崇礼云顶全天票', status: '待使用', price: 468, createdAtText: '默认订单', createdAt: Date.now() - 300000 },
  { id: 'order-2', type: '装备订单', title: '双板套装租赁', status: '已完成', price: 120, createdAtText: '默认订单', createdAt: Date.now() - 600000 },
  { id: 'order-3', type: '教练订单', title: 'Sarah Li 私教课', status: '待确认', price: 550, createdAtText: '默认订单', createdAt: Date.now() - 900000 }
]

let collectionChecked = false

async function ensureCollection() {
  if (collectionChecked) return
  try {
    await db.createCollection('orders')
  } catch (error) {
    // The collection already exists in normal use.
  }
  collectionChecked = true
}

function sortByCreatedAt(items) {
  return items.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
}

async function listOrders(openid) {
  await ensureCollection()
  const result = await collection.where({ ownerOpenid: openid }).limit(50).get()
  if (result.data.length > 0) return sortByCreatedAt(result.data)

  const seededOrders = defaultOrders.map(order => ({
    ...order,
    ownerOpenid: openid
  }))
  await Promise.all(seededOrders.map(order => collection.add({ data: order })))
  return sortByCreatedAt(seededOrders)
}

async function createOrder(event, openid) {
  await ensureCollection()
  const order = {
    id: `order-${Date.now()}`,
    ownerOpenid: openid,
    status: event.status || '待确认',
    createdAtText: '刚刚',
    createdAt: Date.now(),
    type: event.type || '订单',
    title: event.title || '滑雪服务订单',
    price: Number(event.price || 0)
  }
  await collection.add({ data: order })
  return listOrders(openid)
}

async function resetOrders(openid) {
  await ensureCollection()
  const oldOrders = await collection.where({ ownerOpenid: openid }).limit(100).get()
  await Promise.all(oldOrders.data.map(order => collection.doc(order._id).remove()))
  const seededOrders = defaultOrders.map(order => ({
    ...order,
    ownerOpenid: openid
  }))
  await Promise.all(seededOrders.map(order => collection.add({ data: order })))
  return sortByCreatedAt(seededOrders)
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action

  if (action === 'list') return { orders: await listOrders(OPENID) }
  if (action === 'create') return { orders: await createOrder(event, OPENID) }
  if (action === 'reset') return { orders: await resetOrders(OPENID) }

  throw new Error(`Unknown action: ${action}`)
}
