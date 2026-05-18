/**
 * 傩面文化专属纹样数据
 * 每个纹样都与傩面具文化深度结合
 * 使用预渲染的PNG图片（512×512，透明背景）
 */

const patterns = [
  {
    id: 'fang',
    name: '獠牙纹',
    category: 'nuo-feature',
    description: '獠牙纹是傩面具最具标志性的纹饰，上下各一对弯曲獠牙，粗壮尖锐。獠牙是傩面具区别于其他面具的核心特征，象征驱邪镇煞的神秘力量。常见于开山猛将、钟馗等凶神面具。',
    image: '/images/patterns/fang.png',
    defaultColor: '#C41E1E',
    defaultSize: 80,
  },
  {
    id: 'sun-moon',
    name: '日月额纹',
    category: 'nuo-crown',
    description: '日月额纹是傩面具额头上的标志性装饰，左日右月并排排列。太阳放射八道光芒，月亮呈弯月形。象征阴阳调和、天地合一，是傩面具沟通神灵的重要符号。常见于正神和神仙面具的额部。',
    image: '/images/patterns/sun-moon.png',
    defaultColor: '#C9A96E',
    defaultSize: 90,
  },
  {
    id: 'flame-brow',
    name: '火焰眉纹',
    category: 'nuo-feature',
    description: '火焰眉纹是傩面具的标志性眉毛装饰，两条对称的火焰形眉毛从鼻梁向太阳穴延伸上扬。每条眉由数个火焰舌组成，内焰短促，外焰飘逸。凶神面具的火焰眉尤为夸张，象征威猛不可侵犯的气势。',
    image: '/images/patterns/flame-brow.png',
    defaultColor: '#C41E1E',
    defaultSize: 100,
  },
  {
    id: 'dragon-horn',
    name: '龙角冠饰',
    category: 'nuo-crown',
    description: '龙角冠饰是傩面具头顶的重要装饰，一对对称的龙角从头顶向两侧弯曲伸展，角身有节状凸起，底部衬以卷曲云纹。龙角象征神灵的威严与力量，常见于龙王、二郎神等神灵面具的冠饰。',
    image: '/images/patterns/dragon-horn.png',
    defaultColor: '#C9A96E',
    defaultSize: 100,
  },
  {
    id: 'beast-spiral',
    name: '螺旋兽面纹',
    category: 'nuo-ancient',
    description: '螺旋兽面纹源自商周青铜器上的饕餮纹，是傩面具最古老的纹饰之一。以双螺旋代表怒目，中间鼻梁高挺，下方锯齿状獠牙，四周环绕云雷纹。整体呈对称的几何化兽面图案，象征远古神灵的神秘力量。',
    image: '/images/patterns/beast-spiral.png',
    defaultColor: '#1A1A1A',
    defaultSize: 90,
  },
  {
    id: 'frog',
    name: '蛙纹',
    category: 'nuo-ancient',
    description: '蛙纹源自远古先民的蛙图腾崇拜，在傩面具中象征生殖繁衍和旺盛的生命力。几何化的蛙形图案：圆形身体，大眼突出于头顶，四肢对称伸展，体表饰以菱形和三角形几何纹。是傩文化中重要的远古图腾符号。',
    image: '/images/patterns/frog.png',
    defaultColor: '#2D7D46',
    defaultSize: 90,
  },
];

export default patterns;
