/**
 * 购物车商品和金额计算。
 * 这里不读本地存储，页面和 utils/cart.ts 负责存取。
 * 价格按「角」做整数运算，避免 39.9 + 28 这种小数相加出现 105.799999。
 * 1 元 = 10 角。设计稿里的单价都只保留一位小数。
 */

/** 购物车里的一行商品。 */
export interface CartGoods {
  /** 商品唯一标识，同时作为列表 key。 */
  id: string
  /** 商品名，规格写在名称里，例如「林下土鸡蛋 30枚」。 */
  name: string
  /** 名称下面的灰色说明，可以是产地，也可以是「今日直发」。 */
  origin: string
  /** 单价，不带人民币符号，固定一位小数，例如 28.0。 */
  price: string
  /** 购买件数。步进器限制在 1 到 99。 */
  count: number
  /** 是否勾选。结算金额和删除都只处理勾选的行。 */
  checked: boolean
  /** 商品图路径。使用包内压缩图，控制主包体积。 */
  image: string
}

/**
 * 免配送费门槛，单位是角。
 * 390 角 = 39 元，对应设计稿「已满 39 元，免配送费」。
 */
export const FREE_SHIPPING_TENTHS = 390

/** 结算栏需要的汇总结果。 */
export interface CartSummary {
  /** 每一行都勾选时为 true。没有商品时为 false，全选圈显示空心。 */
  allChecked: boolean
  /** 已勾选的件数。结算按钮括号里用这个数，不是商品种类数。 */
  selectedCount: number
  /** 购物车里的全部件数，未勾选的也算。底部角标用这个数。 */
  pieceCount: number
  /** 已勾选商品的合计，一位小数，不带人民币符号。 */
  totalText: string
  /** 运费提示：已满 39 元，或还差多少元。 */
  shipTip: string
}

/**
 * 把单价字符串换成角。
 * 「39.9」得到 399，「28.0」得到 280。只认小数点后第一位。
 * @param price 单价字符串
 */
export function priceToTenths(price: string): number {
  const negative = price.trim().startsWith('-')
  const raw = price.trim().replace('-', '')
  const [yuanText, frac = ''] = raw.split('.')
  const yuan = Number(yuanText)
  const digit = Number(frac[0] || '0')
  if (!Number.isFinite(yuan) || !Number.isFinite(digit)) {
    return 0
  }
  const tenths = yuan * 10 + digit
  return negative ? -tenths : tenths
}

/**
 * 把角格式化成设计稿上的金额，始终保留一位小数。
 * 1058 得到「105.8」，560 得到「56.0」。
 * @param tenths 金额，单位角
 */
export function formatTenths(tenths: number): string {
  const sign = tenths < 0 ? '-' : ''
  const abs = Math.abs(Math.round(tenths))
  const yuan = Math.floor(abs / 10)
  const digit = abs % 10
  return `${sign}${yuan}.${digit}`
}

/**
 * 差额文案用的金额。整数不带小数，有零头才保留一位。
 * 390 得到「39」，291 得到「29.1」。
 * @param tenths 金额，单位角
 */
export function formatGap(tenths: number): string {
  const text = formatTenths(Math.max(0, tenths))
  return text.endsWith('.0') ? text.slice(0, -2) : text
}

/**
 * 根据商品行算出结算栏的数字和文案。
 * 合计、件数括号只统计勾选行；底部角标用全部件数。
 * @param goods 当前商品行
 */
export function summarize(goods: CartGoods[]): CartSummary {
  let selectedTenths = 0
  let selectedCount = 0
  let pieceCount = 0
  let allChecked = goods.length > 0
  goods.forEach((item) => {
    const count = item.count > 0 ? item.count : 0
    pieceCount += count
    if (!item.checked) {
      allChecked = false
      return
    }
    selectedCount += count
    selectedTenths += priceToTenths(item.price) * count
  })
  const reached = selectedTenths >= FREE_SHIPPING_TENTHS
  const gap = FREE_SHIPPING_TENTHS - selectedTenths
  return {
    allChecked,
    selectedCount,
    pieceCount,
    totalText: formatTenths(selectedTenths),
    shipTip: reached ? '已满 39 元，免配送费' : `还差 ${formatGap(gap)} 元，免配送费`,
  }
}

/**
 * 购物车默认商品，一共 10 行。
 * 前三行和设计稿一致：1 件鸡蛋、2 件草莓、1 件番茄。
 * 后面七行复用分类和首页已有图片，不再往主包里加图。
 * 本地还没有对应版本的购物车记录时使用这份数据。
 */
export const defaultCartGoods: CartGoods[] = [
  {
    id: 'eggs',
    name: '林下土鸡蛋 30枚',
    origin: '浙江·安吉',
    price: '39.9',
    count: 1,
    checked: true,
    image: '/assets/cart/eggs.jpg',
  },
  {
    id: 'strawberry',
    name: '红颜草莓 250g',
    origin: '云南·曲靖',
    price: '28.0',
    count: 2,
    checked: true,
    image: '/assets/cart/strawberry.jpg',
  },
  {
    id: 'tomato',
    name: '樱桃番茄 500g',
    origin: '今日直发',
    price: '9.9',
    count: 1,
    checked: true,
    image: '/assets/cart/tomato.jpg',
  },
  {
    id: 'spinach',
    name: '有机菠菜 300g',
    origin: '今日直发',
    price: '6.8',
    count: 1,
    checked: true,
    image: '/assets/category/spinach.jpg',
  },
  {
    id: 'qing',
    name: '上海青 500g',
    origin: '浙江·萧山',
    price: '4.9',
    count: 1,
    checked: true,
    image: '/assets/category/qing.jpg',
  },
  {
    id: 'lettuce',
    name: '生菜 300g',
    origin: '无农药',
    price: '5.5',
    count: 1,
    checked: true,
    image: '/assets/category/lettuce.jpg',
  },
  {
    id: 'youmai',
    name: '油麦菜 400g',
    origin: '清脆',
    price: '4.5',
    count: 1,
    checked: true,
    image: '/assets/category/youmai.jpg',
  },
  {
    id: 'corn',
    name: '甜糯玉米 4根',
    origin: '当季',
    price: '12.8',
    count: 1,
    checked: true,
    image: '/assets/home/goods-corn.jpg',
  },
  {
    id: 'rice',
    name: '五常香米 5kg',
    origin: '黑龙江·五常',
    price: '68.0',
    count: 1,
    checked: true,
    image: '/assets/home/goods-rice.jpg',
  },
  {
    id: 'milk',
    name: '牧场鲜奶 1L',
    origin: '冷链直达',
    price: '16.8',
    count: 1,
    checked: true,
    image: '/assets/home/cat-milk.jpg',
  },
]
