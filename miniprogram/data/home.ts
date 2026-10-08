/**
 * 首页轮播的一条内容。
 * image 使用小程序包内绝对路径，不依赖下载域名。
 */
export interface BannerItem {
  /** 轮播项唯一标识，同时作为列表 key。 */
  id: string
  /** 大标题，例如「当季直供」。 */
  title: string
  /** 标题下方的说明。 */
  subtitle: string
  /** 卡片上的按钮文案。 */
  action: string
  /** 背景图路径。 */
  image: string
}

/**
 * 首页八宫格里的一个分类入口。
 */
export interface CategoryItem {
  /** 分类唯一标识。 */
  id: string
  /** 图标下方的分类名。 */
  name: string
  /** 圆形图标图片路径。 */
  image: string
}

/**
 * 「今日鲜摘」横滑卡片的商品。
 * price、originPrice 用字符串，是为了保留设计稿里的小数位，例如 28.0。
 */
export interface FreshGoods {
  /** 商品唯一标识。 */
  id: string
  /** 商品名，规格直接写在名称里，例如「樱桃番茄 500g」。 */
  name: string
  /** 现价，不带人民币符号。 */
  price: string
  /** 划线原价；没有优惠时不传。 */
  originPrice?: string
  /** 商品图路径。 */
  image: string
  /** 图片左上角角标，例如「今日直发」。 */
  badge?: string
}

/**
 * 「农场直发」双列卡片的商品。
 */
export interface FarmGoods {
  /** 商品唯一标识。 */
  id: string
  /** 商品名，规格写在名称里。 */
  name: string
  /** 现价，不带人民币符号。 */
  price: string
  /** 图片左上角产地或组合标签，例如「浙江·安吉」。 */
  origin: string
  /** 商品图路径。 */
  image: string
}

/**
 * 「今日鲜摘」倒计时的初始剩余秒数。
 * 对应设计稿上的 02:18:36。
 */
export const FLASH_SECONDS = 2 * 60 * 60 + 18 * 60 + 36

/** 首页顶部轮播数据。 */
export const banners: BannerItem[] = [
  {
    id: 'season',
    title: '当季直供',
    subtitle: '48小时从田间到餐桌',
    action: '立即选购',
    image: '/assets/home/banner-field.jpg',
  },
  {
    id: 'origin',
    title: '产地鲜摘',
    subtitle: '冷链直达 锁住新鲜',
    action: '去看看',
    image: '/assets/home/banner-harvest.jpg',
  },
]

/** 首页分类入口，按四列两行的顺序排列。 */
export const categories: CategoryItem[] = [
  { id: 'veg', name: '时令蔬菜', image: '/assets/home/cat-veg.jpg' },
  { id: 'fruit', name: '新鲜水果', image: '/assets/home/cat-fruit.jpg' },
  { id: 'egg', name: '土鸡蛋', image: '/assets/home/cat-egg.jpg' },
  { id: 'meat', name: '散养肉禽', image: '/assets/home/cat-meat.jpg' },
  { id: 'grain', name: '五谷杂粮', image: '/assets/home/cat-grain.jpg' },
  { id: 'milk', name: '鲜奶乳品', image: '/assets/home/cat-milk.jpg' },
  { id: 'dry', name: '农家干货', image: '/assets/home/cat-dry.jpg' },
  { id: 'gift', name: '礼盒套装', image: '/assets/home/cat-gift.jpg' },
]

/** 「今日鲜摘」横滑商品。 */
export const freshGoods: FreshGoods[] = [
  {
    id: 'tomato',
    name: '樱桃番茄 500g',
    price: '9.9',
    originPrice: '16.8',
    badge: '今日直发',
    image: '/assets/home/goods-tomato.jpg',
  },
  {
    id: 'spinach',
    name: '有机菠菜 300g',
    price: '6.8',
    image: '/assets/home/goods-spinach.jpg',
  },
  {
    id: 'corn',
    name: '甜糯玉米 4根',
    price: '12.8',
    image: '/assets/home/goods-corn.jpg',
  },
]

/** 「农场直发」双列商品，顺序为从左到右、从上到下。 */
export const farmGoods: FarmGoods[] = [
  {
    id: 'eggs',
    origin: '浙江·安吉',
    name: '林下土鸡蛋 30枚',
    price: '39.9',
    image: '/assets/home/goods-eggs.jpg',
  },
  {
    id: 'strawberry',
    origin: '云南·曲靖',
    name: '红颜草莓 250g',
    price: '28.0',
    image: '/assets/home/goods-strawberry.jpg',
  },
  {
    id: 'rice',
    origin: '黑龙江·五常',
    name: '五常香米 5kg',
    price: '68.0',
    image: '/assets/home/goods-rice.jpg',
  },
  {
    id: 'box',
    origin: '当季组合',
    name: '田园礼盒',
    price: '128',
    image: '/assets/home/goods-box.jpg',
  },
]
