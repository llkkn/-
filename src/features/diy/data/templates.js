/**
 * DIY模板数据
 * 提供六种角色类型的傩面具DIY创作模板
 */

const templates = [
  {
    id: 'warrior-general',
    name: '武将',
    description:
      '武将模板以安顺地戏面具风格为基础，造型威猛刚烈，棱角分明。眉如烈焰，虎目圆瞪，鼻梁高挺，表情威严。头盔装饰华丽，翎子飞扬，额部设有明镜图案区域。适合创作关公、薛仁贵、尉迟恭等武将形象的傩面具。',
    category: 'role',
    role: 'wujiang',
    imageUrl: '/-/diy-templates/warrior-general.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#C41E1E', // 朱红
      '#C9A96E', // 金色
      '#1A1A1A', // 墨黑
      '#8B0000', // 暗红
      '#DAA520', // 金黄
      '#2F2F2F', // 深灰
    ],
  },
  {
    id: 'civil-official',
    name: '文臣',
    description:
      '文臣模板以萍乡湘东傩面具风格为基础，造型端庄方正，线条柔和。弯月眉，含蓄有神的双目，端正的鼻梁，微抿的嘴唇。头戴乌纱帽区域，整体风格儒雅庄重。适合创作刘文龙、包拯等文臣形象的傩面具。',
    category: 'role',
    role: 'wenchen',
    imageUrl: '/-/diy-templates/civil-official.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#C41E1E', // 朱红
      '#C9A96E', // 金色
      '#F5DEB3', // 米色
      '#DEB887', // 中肤
      '#8B4513', // 棕色
      '#1A1A1A', // 墨黑
    ],
  },
  {
    id: 'deity',
    name: '神仙',
    description:
      '神仙模板以传统傩面具风格为基础，造型庄严华美，超凡脱俗。面容或慈悲或威严，宝冠装饰区域开阔，可添加祥云、火焰等纹样。整体风格神圣庄严，色彩富丽堂皇。适合创作关圣帝君、财神、二郎神等神仙形象的傩面具。',
    category: 'role',
    role: 'shenxian',
    imageUrl: '/-/diy-templates/deity.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#C9A96E', // 金色
      '#C41E1E', // 朱红
      '#1A1A1A', // 墨黑
      '#DAA520', // 金黄
      '#FFD700', // 亮金
      '#8B0000', // 暗红
    ],
  },
  {
    id: 'clown',
    name: '丑角',
    description:
      '丑角模板以安顺地戏面具风格为基础，造型夸张诙谐，充满趣味。面部可自由变形，五官不对称设计，表情滑稽生动。色彩运用大胆自由，支持多种鲜艳色彩的搭配。适合创作孙悟空、小鬼、歪嘴和尚等丑角形象的傩面具。',
    category: 'role',
    role: 'choujiao',
    imageUrl: '/-/diy-templates/clown.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#C41E1E', // 朱红
      '#C9A96E', // 金色
      '#2D7D46', // 翠绿
      '#2F4F7F', // 靛蓝
      '#6B3A6B', // 紫色
      '#FFD700', // 亮金
      '#F5DEB3', // 米白
      '#1A1A1A', // 墨黑
    ],
  },
  {
    id: 'elder',
    name: '老翁',
    description:
      '老翁模板以传统傩面具风格为基础，造型慈祥和蔼，朴实亲切。长眉下垂，面带皱纹，眼角微耷，嘴角含笑。设有胡须装饰区域，可添加白色或灰色长须。整体风格朴素自然，色调温和。适合创作土地公、太白金星、彭祖等老翁形象的傩面具。',
    category: 'role',
    role: 'laoweng',
    imageUrl: '/-/diy-templates/elder.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#FFDAB9', // 浅肤
      '#8B4513', // 棕色
      '#FFFFFF', // 白色
      '#DEB887', // 中肤
      '#D2B48C', // 浅棕
      '#1A1A1A', // 墨黑
    ],
  },
  {
    id: 'young-woman',
    name: '少妇',
    description:
      '少妇模板以池州傩戏面具风格为基础，造型秀丽端庄，温婉柔美。柳叶眉，含情目，秀挺鼻梁，樱桃小口。设有凤钗花簪装饰区域，可添加精美的女性头饰。整体风格柔和明快，色调温馨。适合创作土地婆、观音、仙女等女性形象的傩面具。',
    category: 'role',
    role: 'shaofu',
    imageUrl: '/-/diy-templates/young-woman.png',
    canvasWidth: 600,
    canvasHeight: 800,
    presetColors: [
      '#FFB6C1', // 粉红
      '#FFFFFF', // 白色
      '#DAA520', // 淡金
      '#FFDAB9', // 浅肤
      '#FF69B4', // 玫红
      '#C41E1E', // 朱红
      '#1A1A1A', // 墨黑
    ],
  },
];

export default templates;
