const STORAGE_KEY = 'skigo_demo_orders'
const CLOUD_FUNCTION = 'orderService'

const defaultOrders = [
  { id: 'order-1', type: '雪票订单', title: '崇礼云顶全天票', status: '待使用', price: 468, createdAtText: '默认订单' },
  { id: 'order-2', type: '装备订单', title: '双板套装租赁', status: '已完成', price: 120, createdAtText: '默认订单' },
  { id: 'order-3', type: '教练订单', title: 'Sarah Li 私教课', status: '待确认', price: 550, createdAtText: '默认订单' }
]

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function hasCloud() {
  return Boolean(wx.cloud && wx.cloud.callFunction)
}

function getLocalOrders() {
  const stored = wx.getStorageSync(STORAGE_KEY)
  if (Array.isArray(stored)) return stored
  const initialOrders = clone(defaultOrders)
  wx.setStorageSync(STORAGE_KEY, initialOrders)
  return initialOrders
}

function saveLocalOrders(orders) {
  wx.setStorageSync(STORAGE_KEY, orders)
  return orders
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
    console.warn(`[orderService:${action}] cloud call failed`, error)
    throw error
  }
}

async function getOrders() {
  try {
    const result = await callCloud('list')
    if (Array.isArray(result.orders)) return result.orders
  } catch (error) {
    console.warn('orderService list fallback to local storage')
  }
  return getLocalOrders()
}

async function createOrder(order) {
  try {
    const result = await callCloud('create', order)
    if (Array.isArray(result.orders)) return result.orders
  } catch (error) {
    console.warn('orderService create fallback to local storage')
  }
  const orders = getLocalOrders()
  const newOrder = {
    id: `order-${Date.now()}`,
    status: '待确认',
    createdAtText: '刚刚',
    ...order
  }
  return saveLocalOrders([newOrder, ...orders])
}

async function resetOrders() {
  try {
    const result = await callCloud('reset')
    if (Array.isArray(result.orders)) return result.orders
  } catch (error) {
    console.warn('orderService reset fallback to local storage')
  }
  return saveLocalOrders(clone(defaultOrders))
}

module.exports = {
  getOrders,
  createOrder,
  resetOrders
}
