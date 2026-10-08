/**
 * 分类页的菜单和商品。
 * 左侧八个分类与首页八宫格同名，方便从首页点进来后直接定位。
 * 价格用字符串，是为了保留设计稿里的小数位，例如 4.9。
 */

/** 右侧商品卡上的一条商品。 */
export interface CategoryGoods {
  /** 商品唯一标识，同时作为列表 key。 */
  id: string
  /** 商品名，例如「上海青」。 */
  name: string
  /** 规格和卖点，用间隔号连接，例如「500g · 浙江·萧山」。 */
  spec: string
  /** 现价，不带人民币符号。 */
  price: string
  /** 商品图路径，使用小程序包内绝对路径。 */
  image: string
}

/** 右侧列表里的一个分组，标题下挂若干商品。 */
export interface CategoryGroup {
  /** 分组唯一标识。 */
  id: string
  /** 分组标题，例如「叶菜类」。 */
  name: string
  /** 该分组下的商品，按设计稿从上到下排列。 */
  goods: CategoryGoods[]
}

/** 左侧菜单的一项，以及它对应的右侧分组。 */
export interface CategoryMenu {
  /** 分类唯一标识，与首页分类 id 一致。 */
  id: string
  /** 左侧菜单上的分类名。 */
  name: string
  /** 选中该分类后，右侧按顺序展示的分组。 */
  groups: CategoryGroup[]
}

/**
 * 分类菜单。
 * 第一项「时令蔬菜」是设计稿的默认选中态，叶菜类五件商品的文案和顺序与稿一致。
 * 其余分类用于切换左侧菜单，商品图复用首页已有素材。
 */
export const categoryMenus: CategoryMenu[] = [
  {
    id: 'veg',
    name: '时令蔬菜',
    groups: [
      {
        id: 'leaf',
        name: '叶菜类',
        goods: [
          {
            id: 'qing',
            name: '上海青',
            spec: '500g · 浙江·萧山',
            price: '4.9',
            image: '/assets/category/qing.jpg',
          },
          {
            id: 'spinach',
            name: '有机菠菜',
            spec: '300g · 今日直发',
            price: '6.8',
            image: '/assets/category/spinach.jpg',
          },
          {
            id: 'cabbage',
            name: '小白菜',
            spec: '400g · 当季',
            price: '3.9',
            image: '/assets/category/cabbage.jpg',
          },
          {
            id: 'lettuce',
            name: '生菜',
            spec: '300g · 无农药',
            price: '5.5',
            image: '/assets/category/lettuce.jpg',
          },
          {
            id: 'youmai',
            name: '油麦菜',
            spec: '400g · 清脆',
            price: '4.5',
            image: '/assets/category/youmai.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'fruit',
    name: '新鲜水果',
    groups: [
      {
        id: 'fruit-season',
        name: '应季鲜果',
        goods: [
          {
            id: 'strawberry',
            name: '红颜草莓',
            spec: '250g · 云南·曲靖',
            price: '28.0',
            image: '/assets/home/goods-strawberry.jpg',
          },
          {
            id: 'tomato',
            name: '樱桃番茄',
            spec: '500g · 今日直发',
            price: '9.9',
            image: '/assets/home/goods-tomato.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'egg',
    name: '土鸡蛋',
    groups: [
      {
        id: 'egg-fresh',
        name: '鲜蛋',
        goods: [
          {
            id: 'eggs',
            name: '林下土鸡蛋',
            spec: '30枚 · 浙江·安吉',
            price: '39.9',
            image: '/assets/home/goods-eggs.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'meat',
    name: '散养肉禽',
    groups: [
      {
        id: 'poultry',
        name: '禽肉',
        goods: [
          {
            id: 'chicken',
            name: '散养土鸡',
            spec: '约2斤 · 农家现杀',
            price: '68.0',
            image: '/assets/home/cat-meat.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'grain',
    name: '五谷杂粮',
    groups: [
      {
        id: 'grain-staple',
        name: '米面杂粮',
        goods: [
          {
            id: 'rice',
            name: '五常香米',
            spec: '5kg · 黑龙江·五常',
            price: '68.0',
            image: '/assets/home/goods-rice.jpg',
          },
          {
            id: 'corn',
            name: '甜糯玉米',
            spec: '4根 · 当季',
            price: '12.8',
            image: '/assets/home/goods-corn.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'milk',
    name: '鲜奶乳品',
    groups: [
      {
        id: 'milk-fresh',
        name: '鲜奶',
        goods: [
          {
            id: 'milk',
            name: '牧场鲜奶',
            spec: '1L · 冷链直达',
            price: '16.8',
            image: '/assets/home/cat-milk.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'dry',
    name: '农家干货',
    groups: [
      {
        id: 'dry-mushroom',
        name: '菌菇干货',
        goods: [
          {
            id: 'mushroom',
            name: '山珍香菇',
            spec: '250g · 农家晾晒',
            price: '22.8',
            image: '/assets/home/cat-dry.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'gift',
    name: '礼盒套装',
    groups: [
      {
        id: 'gift-box',
        name: '礼盒',
        goods: [
          {
            id: 'box',
            name: '田园礼盒',
            spec: '1盒 · 当季组合',
            price: '128',
            image: '/assets/home/goods-box.jpg',
          },
        ],
      },
    ],
  },
]

/**
 * 按关键字过滤分组里的商品。
 * 关键字为空时原样返回，商品名或规格命中才保留；分组下没有商品时整组去掉。
 * @param groups 当前分类的全部分组
 * @param keyword 用户输入的关键字，首尾空格会被忽略
 * @returns 过滤后的分组。没有命中时为空数组
 */
export function filterGroups(groups: CategoryGroup[], keyword: string): CategoryGroup[] {
  const key = keyword.trim()
  if (!key) {
    return groups
  }
  return groups
    .map((group) => ({
      ...group,
      goods: group.goods.filter((item) => item.name.indexOf(key) >= 0 || item.spec.indexOf(key) >= 0),
    }))
    .filter((group) => group.goods.length > 0)
}
