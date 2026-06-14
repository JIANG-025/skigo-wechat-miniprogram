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
    rating: 4.8,
    trails: 18,
    lifts: 6,
    difficulty: '初中高级',
    openTime: '08:00 - 16:00',
    description: '长白山万达滑雪场雪季稳定，雪质细腻，配套餐饮、酒店和教学服务完善，适合家庭出行、初学入门和进阶训练。',
    facilities: ['缆车', '雪具大厅', '餐厅', '酒店', '儿童雪场'],
    highlights: ['粉雪体验', '亲子友好', '酒店近雪道'],
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
    rating: 4.9,
    trails: 22,
    lifts: 8,
    difficulty: '初中高级',
    openTime: '08:30 - 16:30',
    description: '崇礼云顶滑雪场拥有高标准雪道和赛事级配套，交通便利，教练资源丰富，适合想系统提升技术的滑雪用户。',
    facilities: ['缆车', '租赁中心', '餐厅', '酒店', '医疗点'],
    highlights: ['奥运雪道', '教练资源多', '雪道选择丰富'],
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
    rating: 4.7,
    trails: 15,
    lifts: 5,
    difficulty: '中高级',
    openTime: '09:00 - 17:00',
    description: '阿勒泰雪场以粉雪和自然地形见长，适合有一定经验的雪友体验更开阔的雪道和更强的户外氛围。',
    facilities: ['缆车', '雪具租赁', '补给站', '救援点'],
    highlights: ['粉雪地形', '自然风景', '进阶训练'],
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
  { id: 'coach-1', name: '李明', initial: '李', level: '国家一级教练', category: '国家教练', price: 500, rating: 4.9, reviews: 328, years: 8, resort: '崇礼云顶', skill: '双板 初级教学 儿童教学', teachTags: ['双板', '初级教学', '儿童教学'], certificates: ['国家一级滑雪指导员', '社会体育指导员'], intro: '长期负责初中级滑雪课程，善于用清晰的动作拆解帮助学员建立刹车、转弯和控速能力。', suitable: '零基础、亲子家庭、初中级进阶', plan: '基础站姿、安全摔倒、犁式转弯、连续换刃。', avatar: '/images/coach-michael.png' },
  { id: 'coach-2', name: '王雪', initial: '王', level: '国家二级教练', category: '国家教练', price: 450, rating: 4.8, reviews: 215, years: 6, resort: '崇礼云顶', skill: '单板 平花 控速', teachTags: ['单板', '平花', '控速'], certificates: ['国家二级滑雪指导员', 'CASI Level 1'], intro: '擅长单板入门和平花基础训练，课程节奏温和，适合怕摔、怕速度的新手学员。', suitable: '单板新手、平花入门、女生小班', plan: '推坡、落叶飘、换刃、基础平花。', avatar: '/images/coach-sarah.png' },
  { id: 'coach-3', name: '张峰', initial: '张', level: '国家一级教练', category: '国家教练', price: 600, rating: 4.9, reviews: 412, years: 10, resort: '长白山万达', skill: '单双板 高级技巧 竞技训练', teachTags: ['单双板', '高级技巧', '竞技训练'], certificates: ['国家一级滑雪指导员', '青少年竞技训练认证'], intro: '有多年驻场和青少年训练经验，适合已经掌握基础动作、希望提升速度控制和滑行效率的学员。', suitable: '中高级雪友、青少年训练、技术纠错', plan: '动态平衡、线路选择、短弯训练、速度控制。', avatar: '/images/coach-zhang.png' },
  { id: 'coach-4', name: '陈静', initial: '陈', level: '雪场高级教练', category: '雪场教练', price: 400, rating: 4.7, reviews: 156, years: 5, resort: '长白山万达', skill: '双板 安全入门 家庭课', teachTags: ['双板', '安全入门', '家庭课'], certificates: ['雪场高级教练认证', '儿童安全教学培训'], intro: '熟悉长白山雪道和家庭客群需求，擅长安排安全、轻松的入门课程。', suitable: '家庭游客、零基础成人、儿童启蒙', plan: '装备适配、基础滑行、安全控速、亲子练习。', avatar: '' },
  { id: 'coach-5', name: '刘洋', initial: '刘', level: 'PSIA Level 2', category: '专业教练', price: 680, rating: 4.9, reviews: 189, years: 9, resort: '崇礼云顶', skill: '刻滑 Carving 进阶纠错', teachTags: ['刻滑', 'Carving', '进阶纠错'], certificates: ['PSIA Alpine Level 2', '视频动作分析认证'], intro: '专注中高级刻滑和动作纠错，会结合视频反馈调整重心、立刃和转弯节奏。', suitable: '中级进阶、刻滑提升、技术纠错', plan: '动作拍摄、问题诊断、立刃训练、连续弯节奏。', avatar: '' },
  { id: 'coach-6', name: '赵然', initial: '赵', level: 'CASI Level 2', category: '专业教练', price: 620, rating: 4.8, reviews: 143, years: 7, resort: '新疆阿勒泰', skill: '单板 粉雪 地形适应', teachTags: ['单板', '粉雪', '地形适应'], certificates: ['CASI Level 2', '野雪安全基础培训'], intro: '擅长单板粉雪和自然地形适应训练，适合想从雪道滑行过渡到更复杂地形的学员。', suitable: '单板进阶、粉雪体验、地形训练', plan: '重心后移控制、粉雪转弯、地形观察、安全线路。', avatar: '' },
  { id: 'coach-7', name: '孙浩', initial: '孙', level: '驻场教练', category: '雪场教练', price: 360, rating: 4.6, reviews: 98, years: 4, resort: '新疆阿勒泰', skill: '双板 初级路线 雪场陪滑', teachTags: ['双板', '初级路线', '雪场陪滑'], certificates: ['雪场驻场教练认证'], intro: '熟悉阿勒泰初中级路线，适合首次到场用户快速熟悉雪道和安全规则。', suitable: '首次到场、初级路线熟悉、陪滑指导', plan: '雪道讲解、路线选择、基础控速、风险提醒。', avatar: '' },
  { id: 'coach-8', name: '周婧', initial: '周', level: '儿童专项教练', category: '雪场教练', price: 420, rating: 4.8, reviews: 176, years: 6, resort: '长白山万达', skill: '儿童教学 亲子课程 双板', teachTags: ['儿童教学', '亲子课程', '双板'], certificates: ['儿童滑雪教学认证', '雪场安全员培训'], intro: '擅长儿童启蒙和亲子课程设计，课程中会加入游戏化练习，提高孩子的参与度。', suitable: '4-12岁儿童、亲子课程、双板启蒙', plan: '热身游戏、平衡练习、刹车转弯、亲子互动。', avatar: '' },
  { id: 'coach-9', name: '何然', initial: '何', level: '自由式专项', category: '专业教练', price: 720, rating: 4.9, reviews: 121, years: 8, resort: '崇礼云顶', skill: '自由式 平花 小跳台', teachTags: ['自由式', '平花', '小跳台'], certificates: ['自由式滑雪专项训练认证', '急救培训证书'], intro: '自由式专项教练，适合有稳定滑行基础后学习平花组合、小跳台入门和动作安全落地。', suitable: '自由式入门、平花组合、小跳台基础', plan: '动作分解、低速练习、跳台安全、落地稳定。', avatar: '' }
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
