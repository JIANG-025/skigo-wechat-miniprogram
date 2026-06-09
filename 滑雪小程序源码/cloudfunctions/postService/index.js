const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const collection = db.collection('posts')

const seedPosts = [
  {
    id: 'post-1',
    author: '滑雪大玩家',
    initial: '滑',
    resort: '崇礼云顶',
    content: '今天又来刷云顶，雪况真不错，坡度适中，拍照很出片。',
    likes: 128,
    likedBy: [],
    comments: 0,
    commentsList: [],
    avatar: '/images/avatar-player.png',
    images: ['/images/post-ski-1.png', '/images/post-ski-2.png', '/images/post-ski-3.png'],
    deletable: false,
    createdAtText: '2小时前',
    createdAt: Date.now() - 7200000
  },
  {
    id: 'post-2',
    author: '小雪',
    initial: '小',
    resort: '长白山万达',
    content: '第一次滑长白山，被这里的雪质惊艳到了，分享一下这次攻略。',
    likes: 256,
    likedBy: [],
    comments: 0,
    commentsList: [],
    avatar: '/images/avatar-xiaoxue.png',
    images: ['/images/post-guide.png'],
    deletable: false,
    createdAtText: '2小时前',
    createdAt: Date.now() - 7200000
  }
]

async function ensureCollection() {
  try {
    await db.createCollection('posts')
  } catch (error) {
    if (!String(error.errMsg || '').includes('already exists')) {
      // The collection may already exist in environments that return a different message.
    }
  }
}

async function seedIfEmpty() {
  await ensureCollection()
  const countResult = await collection.count()
  if (countResult.total > 0) return
  await Promise.all(seedPosts.map(post => collection.add({ data: post })))
}

function formatPost(post, openid) {
  const likedBy = Array.isArray(post.likedBy) ? post.likedBy : []
  const commentsList = Array.isArray(post.commentsList) ? post.commentsList : []
  return {
    ...post,
    commentsList,
    liked: likedBy.includes(openid),
    likes: Number(post.likes || 0),
    comments: commentsList.length,
    deletable: Boolean(post.deletable || post._openid === openid)
  }
}

async function listPosts(openid) {
  await seedIfEmpty()
  const result = await collection.orderBy('createdAt', 'desc').limit(50).get()
  return result.data.map(post => formatPost(post, openid))
}

async function getPost(id, openid) {
  await seedIfEmpty()
  const result = await collection.where({ id }).limit(1).get()
  return result.data[0] ? formatPost(result.data[0], openid) : null
}

async function createPost(event, openid) {
  const id = `post-${Date.now()}`
  const post = {
    id,
    author: '滑雪达人',
    initial: '雪',
    resort: event.resort || '崇礼云顶',
    content: event.content || '',
    likes: 0,
    likedBy: [],
    comments: 0,
    commentsList: [],
    avatar: '/images/avatar-player.png',
    images: ['/images/post-ski-1.png'],
    deletable: true,
    createdAtText: '刚刚',
    createdAt: Date.now()
  }
  await collection.add({ data: post })
  return listPosts(openid)
}

async function toggleLike(id, openid) {
  const post = await getPost(id, openid)
  if (!post) return listPosts(openid)
  const likedBy = Array.isArray(post.likedBy) ? post.likedBy : []
  const liked = likedBy.includes(openid)
  await collection.where({ id }).update({
    data: {
      likedBy: liked ? _.pull(openid) : _.addToSet(openid),
      likes: _.inc(liked ? -1 : 1)
    }
  })
  return listPosts(openid)
}

async function deletePost(id, openid) {
  const post = await getPost(id, openid)
  if (!post) return listPosts(openid)
  if (!post.deletable && post._openid !== openid) {
    throw new Error('只能删除自己发布的动态')
  }
  await collection.where({ id }).remove()
  return listPosts(openid)
}

async function addComment(event, openid) {
  const comment = {
    id: `comment-${Date.now()}`,
    author: '我',
    content: event.content || '',
    createdAt: Date.now(),
    _openid: openid
  }
  await collection.where({ id: event.id }).update({
    data: {
      commentsList: _.push(comment),
      comments: _.inc(1)
    }
  })
  return getPost(event.id, openid)
}

async function resetPosts(openid) {
  await seedIfEmpty()
  const userPosts = await collection.where({ _openid: openid }).get()
  await Promise.all(userPosts.data.map(post => collection.doc(post._id).remove()))

  const defaultResult = await collection.where({
    id: _.in(seedPosts.map(post => post.id))
  }).get()
  await Promise.all(defaultResult.data.map(post => collection.doc(post._id).remove()))
  await Promise.all(seedPosts.map(post => collection.add({ data: post })))
  return listPosts(openid)
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action

  if (action === 'list') return { posts: await listPosts(OPENID) }
  if (action === 'get') return { post: await getPost(event.id, OPENID) }
  if (action === 'create') return { posts: await createPost(event, OPENID) }
  if (action === 'toggleLike') return { posts: await toggleLike(event.id, OPENID) }
  if (action === 'delete') return { posts: await deletePost(event.id, OPENID) }
  if (action === 'comment') return { post: await addComment(event, OPENID) }
  if (action === 'reset') return { posts: await resetPosts(OPENID) }

  throw new Error(`Unknown action: ${action}`)
}
