const { posts: defaultPosts } = require('./mock-data')

const STORAGE_KEY = 'skigo_demo_posts'
const CLOUD_FUNCTION = 'postService'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizePost(post) {
  return {
    commentsList: [],
    liked: false,
    deletable: false,
    ...post
  }
}

function hasCloud() {
  return Boolean(wx.cloud && wx.cloud.callFunction)
}

function getLocalPosts() {
  const stored = wx.getStorageSync(STORAGE_KEY)
  if (Array.isArray(stored)) {
    return stored.map(normalizePost)
  }
  const initialPosts = clone(defaultPosts).map(normalizePost)
  wx.setStorageSync(STORAGE_KEY, initialPosts)
  return initialPosts
}

function saveLocalPosts(posts) {
  wx.setStorageSync(STORAGE_KEY, posts)
  return posts
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
    console.warn(`[postService:${action}] cloud call failed`, error)
    throw error
  }
}

function createLocalPost({ resort, content }) {
  const posts = getLocalPosts()
  const post = normalizePost({
    id: `post-${Date.now()}`,
    author: '滑雪达人',
    initial: '雪',
    resort,
    content,
    likes: 0,
    comments: 0,
    avatar: '/images/avatar-player.png',
    images: ['/images/post-ski-1.png'],
    deletable: true,
    createdAtText: '刚刚'
  })
  return saveLocalPosts([post, ...posts])
}

async function getPosts() {
  try {
    const result = await callCloud('list')
    if (Array.isArray(result.posts)) return result.posts.map(normalizePost)
  } catch (error) {
    console.warn('postService list failed, fallback to local storage', error)
  }
  return getLocalPosts()
}

async function createPost({ resort, content }) {
  try {
    const result = await callCloud('create', { resort, content })
    if (Array.isArray(result.posts)) return result.posts.map(normalizePost)
  } catch (error) {
    console.warn('postService create failed, fallback to local storage', error)
  }
  return createLocalPost({ resort, content })
}

async function toggleLike(id) {
  try {
    const result = await callCloud('toggleLike', { id })
    if (Array.isArray(result.posts)) return result.posts.map(normalizePost)
  } catch (error) {
    console.warn('postService toggleLike failed, fallback to local storage', error)
  }
  const posts = getLocalPosts().map(post => {
    if (post.id !== id) return post
    const liked = !post.liked
    return {
      ...post,
      liked,
      likes: Math.max(0, post.likes + (liked ? 1 : -1))
    }
  })
  return saveLocalPosts(posts)
}

async function deletePost(id) {
  try {
    const result = await callCloud('delete', { id })
    if (Array.isArray(result.posts)) return result.posts.map(normalizePost)
  } catch (error) {
    console.warn('postService delete failed, fallback to local storage', error)
  }
  return saveLocalPosts(getLocalPosts().filter(post => post.id !== id))
}

async function getPost(id) {
  try {
    const result = await callCloud('get', { id })
    if (result.post) return normalizePost(result.post)
  } catch (error) {
    console.warn('postService get failed, fallback to local storage', error)
  }
  return getLocalPosts().find(post => post.id === id)
}

async function addComment(id, content) {
  try {
    const result = await callCloud('comment', { id, content })
    if (result.post) return normalizePost(result.post)
  } catch (error) {
    console.warn('postService comment failed, fallback to local storage', error)
  }
  const posts = getLocalPosts().map(post => {
    if (post.id !== id) return post
    const commentsList = [
      ...(post.commentsList || []),
      {
        id: `comment-${Date.now()}`,
        author: '我',
        content
      }
    ]
    return {
      ...post,
      commentsList,
      comments: commentsList.length
    }
  })
  saveLocalPosts(posts)
  return posts.find(post => post.id === id)
}

async function resetPosts() {
  try {
    const result = await callCloud('reset')
    if (Array.isArray(result.posts)) return result.posts.map(normalizePost)
  } catch (error) {
    console.warn('postService reset failed, fallback to local storage', error)
  }
  const initialPosts = clone(defaultPosts).map(normalizePost)
  return saveLocalPosts(initialPosts)
}

module.exports = {
  getPosts,
  createPost,
  toggleLike,
  deletePost,
  getPost,
  addComment,
  resetPosts
}
