/**
 * 傩面展品数据
 * 覆盖五大流派、六种角色类型的代表性傩面具展品
 *
 * 流派分布：萍乡5个、池州5个、安顺5个、武安2个、泸溪1个
 * 角色分布：武将6个、文臣3个、神仙3个、丑角2个、老翁1个、少妇2个、少妇1个
 */

const galleryItems = [
  // ===== 萍乡湘东傩面具（3个）=====
  {
    id: 'px-001',
    name: '方相氏面具',
    region: 'pingxiang',
    regionName: '萍乡湘东',
    role: '方相氏',
    roleCategory: 'shenxian',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高32cm × 宽22cm × 厚10cm',
    period: '清代',
    description:
      '方相氏是傩文化中最古老的神灵形象，据《周礼》记载为"黄金四目"的驱疫之神。此面具造型古朴威严，双目圆瞪，獠牙外露，头戴双角，面部以朱红为主色调，辅以黑色和金色纹饰，充分展现了远古神灵的威猛气势。',
    culturalNote:
      '方相氏形象源自先秦时期，是中国傩文化最古老的图腾之一。黄金四目的造型象征着洞察一切邪恶的超自然能力，在傩仪中承担驱鬼逐疫的核心职能。',
    imageUrl: '/images/masks/pingxiang/panguan.jpg',
    tags: ['方相氏', '驱疫', '先秦', '黄金四目', '萍乡'],
  },
  {
    id: 'px-002',
    name: '钟馗面具',
    region: 'pingxiang',
    regionName: '萍乡湘东',
    role: '钟馗',
    roleCategory: 'shenxian',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高28cm × 宽20cm × 厚9cm',
    period: '清代',
    description:
      '钟馗是中国民间最著名的驱邪镇宅神灵之一。此面具豹头环眼，铁面虬髯，表情威严中透着一股正气。面部以深红色为底，黑色勾勒五官轮廓，金色点缀冠饰和须发，整体造型刚劲有力，是萍乡傩面具的经典之作。',
    culturalNote:
      '钟馗信仰始于唐代，相传唐明皇梦中所见的驱鬼大将被封为"赐福镇宅圣君"。钟馗形象在傩面具中极为常见，是驱邪镇宅、保佑平安的象征。',
    imageUrl: '/images/masks/pingxiang/zhongkui.jpg',
    tags: ['钟馗', '驱邪', '镇宅', '唐代', '萍乡'],
  },
  {
    id: 'px-003',
    name: '开山将军面具',
    region: 'pingxiang',
    regionName: '萍乡湘东',
    role: '开山将军',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高35cm × 宽24cm × 厚12cm',
    period: '明代',
    description:
      '开山将军是傩戏中的开路先锋，形象威猛刚烈。此面具双角峥嵘，獠牙外露，怒目圆睁，面部肌肉紧绷，充满力量感。以朱红色为主调，黑色勾勒纹路，金色装饰头盔和角饰，造型夸张而富有张力。',
    culturalNote:
      '开山将军在傩戏仪式中承担"开路"的重要职能，其双角和獠牙的造型源自远古神兽的形象，象征着开辟道路、驱除障碍的神力。',
    imageUrl: '/images/masks/pingxiang/kaishan.jpg',
    tags: ['开山将军', '武将', '先锋', '明代', '萍乡'],
  },

  // ===== 池州傩戏面具（3个）=====
  {
    id: 'cz-001',
    name: '刘文龙面具',
    region: 'chizhou',
    regionName: '池州',
    role: '刘文龙',
    roleCategory: 'wenchen',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高24cm × 宽17cm × 厚8cm',
    period: '清代',
    description:
      '刘文龙是池州傩戏中的经典文臣角色，面容端正儒雅，眉清目秀。弯月眉下双目含蓄有神，鼻梁挺直，嘴角微抿，整体表情沉稳端庄。面具以肉色为底，朱红点缀唇部和双颊，头戴乌纱帽，体现了徽派文化中文臣的庄重形象。',
    culturalNote:
      '刘文龙是池州傩戏《刘文龙赶考》中的主人公，该剧目是池州傩戏的代表性剧目之一，讲述了书生刘文龙赶考中状元的故事，体现了民间对读书求学的崇敬。',
    imageUrl: '/images/masks/chizhou/baogong.jpg',
    tags: ['刘文龙', '文臣', '书生', '池州', '徽派'],
  },
  {
    id: 'cz-002',
    name: '关公面具',
    region: 'chizhou',
    regionName: '池州',
    role: '关羽',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高30cm × 宽22cm × 厚10cm',
    period: '清代',
    description:
      '关公是池州傩戏中忠义仁勇的化身。此面具丹凤眼微眯，卧蚕眉斜飞入鬓，面如重枣，长髯飘拂。以深红色为面部主色，黑色描眉画须，绿色点缀战袍边缘，金色装饰冠饰，整体造型庄严肃穆，忠义之气跃然而出。',
    culturalNote:
      '关羽是中国民间信仰中忠义的化身，被尊为"关圣帝君""武财神"。在傩戏中，关公面具常用于驱邪镇煞的仪式，其忠义精神也深受百姓推崇。',
    imageUrl: '/images/masks/chizhou/guanyu.jpg',
    tags: ['关羽', '武将', '关公', '忠义', '池州'],
  },
  {
    id: 'cz-003',
    name: '土地婆面具',
    region: 'chizhou',
    regionName: '池州',
    role: '土地婆',
    roleCategory: 'shaofu',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高22cm × 宽16cm × 厚7cm',
    period: '民国',
    description:
      '土地婆是池州傩戏中掌管一方土地的女神形象。此面具面容慈祥和蔼，柳叶眉弯弯如月，双目含笑，鼻梁秀挺，樱唇微启。以粉白色为面部主色，淡红色晕染双颊，头饰凤钗花簪，整体风格温婉秀丽，体现了民间对土地女神的美好想象。',
    culturalNote:
      '土地公与土地婆是中国民间最普遍的土地神信仰，在池州傩戏中，土地婆常与土地公配对出现，象征着对土地的敬畏和对丰收的祈愿。',
    imageUrl: '/images/masks/chizhou/zhangfei.jpg',
    tags: ['土地婆', '少妇', '女神', '池州', '土地信仰'],
  },

  // ===== 安顺地戏面具（3个）=====
  {
    id: 'as-001',
    name: '薛仁贵面具',
    region: 'anshun',
    regionName: '安顺',
    role: '薛仁贵',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '丁香木',
    dimensions: '高38cm × 宽26cm × 厚14cm',
    period: '清代',
    description:
      '薛仁贵是安顺地戏中最受欢迎的武将角色之一。此面具面容英俊威武，剑眉星目，鼻梁高挺，嘴角含笑中透着英气。白盔白甲的装饰华丽繁复，盔顶翎子高耸，额部刻有明镜图案。以白色和金色为主色调，朱红点缀唇部和盔缨，整体造型英武华美。',
    culturalNote:
      '薛仁贵是唐代名将，征东立功的故事在民间广为流传。在安顺地戏中，薛仁贵是"将类"面具的代表角色，其白盔白甲的形象象征着忠勇善战的武将风范。',
    imageUrl: '/images/masks/anshun/wujiang.jpg',
    tags: ['薛仁贵', '武将', '唐代名将', '安顺', '地戏'],
  },
  {
    id: 'as-002',
    name: '尉迟恭面具',
    region: 'anshun',
    regionName: '安顺',
    role: '尉迟恭',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '丁香木',
    dimensions: '高36cm × 宽25cm × 厚13cm',
    period: '清代',
    description:
      '尉迟恭是安顺地戏中黑面武将的经典形象。此面具面如黑铁，虬髯如戟，环眼圆睁，表情威猛刚烈。黑色面部与金色盔甲形成强烈对比，盔顶翎子飞扬，额部刻有阴阳太极图案。整体造型粗犷有力，色彩浓烈鲜明，充分体现了安顺地戏面具夸张生动的艺术特色。',
    culturalNote:
      '尉迟恭（尉迟敬德）是唐代名将，与秦叔宝并列为民间最流行的门神形象。在安顺地戏中，尉迟恭是"将类"面具中黑面武将的代表，其刚烈威猛的形象深受屯堡人喜爱。',
    imageUrl: '/images/masks/anshun/wenjiang.jpg',
    tags: ['尉迟恭', '武将', '门神', '黑面', '安顺'],
  },
  {
    id: 'as-003',
    name: '猴王面具',
    region: 'anshun',
    regionName: '安顺',
    role: '孙悟空',
    roleCategory: 'choujiao',
    formType: 'zhenglian',
    material: '白杨木',
    dimensions: '高26cm × 宽20cm × 厚9cm',
    period: '民国',
    description:
      '猴王面具是安顺地戏中"丑角"类的代表作品。此面具面部造型夸张诙谐，尖嘴猴腮，圆眼滴溜溜转动，面部以金黄色为主，红色点缀面部和耳朵，配以小巧的金色头冠。整体造型灵动活泼，充满趣味性和民间智慧。',
    culturalNote:
      '孙悟空形象在安顺地戏中属于"丑角"类别，但其地位特殊，常作为机智勇敢的正面角色出现。猴王面具体现了民间艺人对这一经典文学形象的独特诠释。',
    imageUrl: '/images/masks/anshun/choujiao.jpg',
    tags: ['孙悟空', '丑角', '猴王', '安顺', '诙谐'],
  },

  // ===== 武安傩戏面具（2个）=====
  {
    id: 'wa-001',
    name: '黄鬼面具',
    region: 'wuan',
    regionName: '武安',
    role: '黄鬼',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '白杨木',
    dimensions: '高40cm × 宽28cm × 厚15cm',
    period: '清代',
    description:
      '黄鬼是武安傩戏"捉黄鬼"仪式中的核心角色，代表着一切疫病和灾祸的化身。此面具造型狰狞恐怖，面目扭曲，獠牙交错，双目怒突。以黄色和黑色为主色调，辅以红色血痕效果，整体造型粗犷豪放，充满原始的力量感和恐惧感。',
    culturalNote:
      '"捉黄鬼"是武安傩戏最具特色的仪式活动，每年正月举行。黄鬼作为被捉拿和驱逐的对象，象征着人间的一切瘟疫灾祸。这一仪式保留了远古傩仪驱逐疫鬼的核心功能，是研究傩文化起源的活态标本。',
    imageUrl: '/images/masks/wuan/kailu.jpg',
    tags: ['黄鬼', '武将', '捉黄鬼', '驱疫', '武安'],
  },
  {
    id: 'wa-002',
    name: '判官面具',
    region: 'wuan',
    regionName: '武安',
    role: '判官',
    roleCategory: 'wenchen',
    formType: 'banlian',
    material: '白杨木',
    dimensions: '高28cm × 宽22cm × 厚8cm',
    period: '清代',
    description:
      '判官是武安傩戏中掌管善恶审判的文官形象。此面具为半脸造型，额头宽阔，浓眉如墨，双目炯炯有神，鼻梁端正。以朱红色为面部主色，黑色浓眉和胡须形成鲜明对比，整体风格刚正不阿，体现出北方民间艺术的大气质朴。',
    culturalNote:
      '判官在傩戏中承担着审判善恶、驱邪惩恶的职能，其形象源自中国民间信仰中的阴间官吏。武安傩戏中的判官面具采用半脸造型，便于演员在表演中唱念台词。',
    imageUrl: '/images/masks/wuan/panguan-wa.jpg',
    tags: ['判官', '文臣', '半脸', '审判', '武安'],
  },

  // ===== 泸溪傩面具（1个）=====
  {
    id: 'lx-001',
    name: '傩公面具',
    region: 'luxi',
    regionName: '泸溪',
    role: '傩公',
    roleCategory: 'laoweng',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高30cm × 宽22cm × 厚10cm',
    period: '民国',
    description:
      '傩公是湘西泸溪傩事活动中最崇高的主神形象。此面具面容慈祥庄严，长眉下垂至颧骨，双目微阖似在沉思，白须长髯飘洒胸前。以深褐色为面部主色，黑色勾勒皱纹和须发，金色点缀头冠，整体造型古朴神秘，充满楚巫文化的浪漫主义色彩。',
    culturalNote:
      '傩公（又称傩神爷爷）是湘西地区傩事活动中主司傩仪的大神，与傩婆（傩神奶奶）配对出现。泸溪傩公面具深受楚巫文化影响，其神秘古朴的造型体现了湘西地区"信巫鬼、重淫祀"的文化传统。',
    imageUrl: '/images/masks/luxi/kaishan-luxi.jpg',
    tags: ['傩公', '老翁', '主神', '楚巫文化', '泸溪'],
  },

  // ===== 萍乡湘东傩面具（新增2个）=====
  {
    id: 'px-004',
    name: '方相氏面具',
    region: 'pingxiang',
    regionName: '萍乡湘东',
    role: '方相氏',
    roleCategory: 'shenxian',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高35cm × 宽25cm × 厚12cm',
    period: '宋代',
    description:
      '方相氏是傩文化中最古老的神灵形象，据《周礼》记载为"黄金四目"的驱疫之神。此面具造型古朴威严，四目圆瞪，獠牙外露，头戴双角，面部以朱红为主色调，辅以黑色和金色纹饰。',
    culturalNote:
      '方相氏形象源自先秦时期，是中国傩文化最古老的图腾之一。黄金四目的造型象征着洞察一切邪恶的超自然能力。',
    imageUrl: '/images/masks/pingxiang/fangxiangshi.jpg',
    tags: ['方相氏', '驱疫', '黄金四目', '萍乡'],
  },
  {
    id: 'px-005',
    name: '开山将军面具',
    region: 'pingxiang',
    regionName: '萍乡湘东',
    role: '开山将军',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高38cm × 宽26cm × 厚13cm',
    period: '明代',
    description:
      '开山将军是傩戏中的开路先锋，双角峥嵘，獠牙外露，怒目圆睁。以朱红色为主调，黑色勾勒纹路，金色装饰头盔和角饰。',
    culturalNote:
      '开山将军在傩戏仪式中承担"开路"的重要职能，其双角和獠牙的造型源自远古神兽形象。',
    imageUrl: '/images/masks/pingxiang/kaishanjiangjun.jpg',
    tags: ['开山将军', '武将', '先锋', '萍乡'],
  },

  // ===== 池州傩戏面具（新增2个）=====
  {
    id: 'cz-004',
    name: '刘文龙面具',
    region: 'chizhou',
    regionName: '池州',
    role: '刘文龙',
    roleCategory: 'wenchen',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高24cm × 宽17cm × 厚8cm',
    period: '清代',
    description:
      '刘文龙是池州傩戏中的经典文臣角色，面容端正儒雅，眉清目秀。弯月眉下双目含蓄有神，头戴乌纱帽，体现了徽派文化中文臣的庄重形象。',
    culturalNote:
      '刘文龙是池州傩戏《刘文龙赶考》中的主人公，该剧目是池州傩戏的代表性剧目之一。',
    imageUrl: '/images/masks/chizhou/liuwenlong.jpg',
    tags: ['刘文龙', '文臣', '池州', '徽派'],
  },
  {
    id: 'cz-005',
    name: '土地婆面具',
    region: 'chizhou',
    regionName: '池州',
    role: '土地婆',
    roleCategory: 'shaofu',
    formType: 'zhenglian',
    material: '樟木',
    dimensions: '高22cm × 宽16cm × 厚7cm',
    period: '民国',
    description:
      '土地婆是池州傩戏中掌管一方土地的女神形象。面容慈祥和蔼，柳叶眉弯弯如月，以粉白色为面部主色，头饰凤钗花簪。',
    culturalNote:
      '土地公与土地婆是中国民间最普遍的土地神信仰，在池州傩戏中常与土地公配对出现。',
    imageUrl: '/images/masks/chizhou/tudipo.jpg',
    tags: ['土地婆', '少妇', '女神', '池州'],
  },

  // ===== 安顺地戏面具（新增2个）=====
  {
    id: 'as-004',
    name: '薛仁贵面具',
    region: 'anshun',
    regionName: '安顺',
    role: '薛仁贵',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '丁香木',
    dimensions: '高38cm × 宽26cm × 厚14cm',
    period: '清代',
    description:
      '薛仁贵是安顺地戏中最受欢迎的武将角色之一。面容英俊威武，剑眉星目，白盔白甲装饰华丽繁复，盔顶翎子高耸。',
    culturalNote:
      '薛仁贵是唐代名将，在安顺地戏中是"将类"面具的代表角色。',
    imageUrl: '/images/masks/anshun/xuerengui.jpg',
    tags: ['薛仁贵', '武将', '安顺', '地戏'],
  },
  {
    id: 'as-005',
    name: '尉迟恭面具',
    region: 'anshun',
    regionName: '安顺',
    role: '尉迟恭',
    roleCategory: 'wujiang',
    formType: 'zhenglian',
    material: '丁香木',
    dimensions: '高36cm × 宽25cm × 厚13cm',
    period: '清代',
    description:
      '尉迟恭是安顺地戏中黑面武将的经典形象。面如黑铁，虬髯如戟，环眼圆睁，黑色面部与金色盔甲形成强烈对比。',
    culturalNote:
      '尉迟恭与秦叔宝并列为民间最流行的门神形象。',
    imageUrl: '/images/masks/anshun/yuchigong.jpg',
    tags: ['尉迟恭', '武将', '门神', '安顺'],
  },
];

export default galleryItems;
