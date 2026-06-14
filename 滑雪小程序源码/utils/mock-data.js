const resorts = [
  {
    id: 'resort-1',
    name: '长白山万达',
    location: '吉林白山',
    status: '可滑雪',
    price: 380,
    feature: '天然粉雪 顶级雪场',
    weather: '晴 -12℃',
    snow: '雪况优',
    latitude: 42.09,
    longitude: 128.12,
    image: '/images/resort-changbai.png'
  },
  {
    id: 'resort-2',
    name: '崇礼云顶',
    location: '河北张家口',
    status: '可滑雪',
    price: 468,
    feature: '奥运场地 设施齐全',
    weather: '多云 -8℃',
    snow: '雪况良',
    latitude: 40.96,
    longitude: 115.28,
    image: '/images/resort-chongli.png'
  },
  {
    id: 'resort-3',
    name: '新疆阿勒泰',
    location: '新疆阿勒泰',
    status: '即将开滑',
    price: 298,
    feature: '人类滑雪起源地',
    weather: '小雪 -15℃',
    snow: '粉雪',
    latitude: 47.85,
    longitude: 88.13,
    image: '/images/resort-altay.png'
  }
]

const products = [
  { id: 'product-1', name: '全能竞技滑雪板', price: 2899, tag: '热销', image: '/images/product-board.png' },
  { id: 'product-2', name: '专业防水滑雪服套装', price: 1599, tag: '新品', image: '/images/product-suit.png' },
  { id: 'product-3', name: '防雾防紫外线滑雪镜', price: 499, tag: '推荐', image: '/images/product-goggles.png' },
  { id: 'product-4', name: '高山滑雪靴', price: 2199, tag: '专业', image: '/images/product-boots.png' }
]

const coaches = [
  { id: 'coach-1', name: 'Michael Wang', initial: 'M', level: 'PSIA A级', category: '专业教练', price: 600, rating: 4.9, reviews: 328, years: 8, resort: '崇礼云顶', skill: '平花 刻滑', certificate: 'PSIA Alpine Level 2', intro: '擅长进阶控速、刻滑和平花动作训练，课程节奏清晰。', avatar: '/images/coach-michael.png' },
  { id: 'coach-2', name: 'Sarah Li', initial: 'S', level: '加拿大 CASI', category: '国家教练', price: 550, rating: 4.8, reviews: 215, years: 6, resort: '崇礼云顶', skill: '零基础启蒙', certificate: 'CASI Level 1', intro: '适合零基础和儿童入门教学，注重安全、动作规范和信心建立。', avatar: '/images/coach-sarah.png' },
  { id: 'coach-3', name: '张建国', initial: '张', level: '国职高级', category: '雪场教练', price: 500, rating: 4.9, reviews: 412, years: 10, resort: '长白山万达', skill: '单双板全能', certificate: '国家一级滑雪指导员', intro: '长期驻场授课，熟悉雪道条件，适合家庭和进阶训练。', avatar: '/images/coach-zhang.png' }
]

const posts = [
  {
    id: 'post-1',
    author: '滑雪大玩家',
    initial: '滑',
    resort: '崇礼云顶',
    content: '今天又来刷云顶，雪况真不错，坡度适中，拍照很出片。',
    likes: 128,
    comments: 16,
    avatar: '/images/avatar-player.png',
    images: ['/images/post-ski-1.png', '/images/post-ski-2.png', '/images/post-ski-3.png']
  },
  {
    id: 'post-2',
    author: '小雪',
    initial: '小',
    resort: '长白山万达',
    content: '第一次滑长白山，被这里的雪质惊艳到了，分享一下这次攻略。',
    likes: 256,
    comments: 42,
    avatar: '/images/avatar-xiaoxue.png',
    images: ['/images/post-guide.png']
  }
]

module.exports = {
  resorts,
  products,
  coaches,
  posts
}
