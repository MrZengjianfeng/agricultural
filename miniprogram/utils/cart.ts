import type { CartGoods } from '../data/cart'

/**
 * 购物车件数在本地存储中的键名。
 * 这个数字给底部角标用。商品行存在 CART_GOODS_KEY，保存商品行时会把件数一并写回来。
 */
const STORAGE_KEY = 'cartCount'

/**
 * 购物车商品行的存储键。
 * 没写过这个键，或版本还是旧的三件商品时，购物车页使用十件默认商品。
 * 写成空数组表示用户把商品都删掉了，不能再退回默认商品。
 */
const CART_GOODS_KEY = 'cartGoods'

/**
 * 默认商品的版本。
 * 改成 10 条后升到 2。读到旧版本时丢掉之前的三件缓存，避免页面还停在旧数据。
 */
const CART_SEED_VERSION = 2

/** 默认商品版本在本地存储中的键名。 */
const CART_SEED_KEY = 'cartSeedVersion'

/** 没有存过数量时展示的默认角标，与首页设计稿一致。 */
const DEFAULT_COUNT = 2

/**
 * 读取购物车商品件数。
 * 本地没有记录、记录为空或不是非负整数时，返回默认件数。
 * @returns 当前购物车件数，最小为 0
 */
export function getCartCount(): number {
  const stored = wx.getStorageSync(STORAGE_KEY) as number | string | undefined
  if (stored === '' || stored === undefined || stored === null) {
    return DEFAULT_COUNT
  }
  const count = Number(stored)
  if (!Number.isFinite(count) || count < 0) {
    return DEFAULT_COUNT
  }
  return Math.floor(count)
}

/**
 * 把购物车件数写成指定值。
 * 小数会向下取整，负数会按 0 保存。
 * @param count 要保存的件数
 * @returns 实际写入的件数
 */
export function setCartCount(count: number): number {
  const next = Math.max(0, Math.floor(count))
  wx.setStorageSync(STORAGE_KEY, next)
  return next
}

/**
 * 在现有件数上增加商品。
 * @param step 增加的件数，默认 1
 * @returns 增加后的总件数
 */
export function addCartCount(step = 1): number {
  return setCartCount(getCartCount() + step)
}

/**
 * 把本地存的一条记录整理成商品行。
 * 缺字段、件数不是数字的记录丢掉，避免坏缓存把页面渲染崩掉。
 * 件数限制在 1 到 99，和步进器的上下限一致。
 */
function normalizeGoods(raw: unknown): CartGoods | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }
  const item = raw as Partial<CartGoods>
  if (typeof item.id !== 'string' || !item.id) {
    return null
  }
  if (typeof item.name !== 'string' || typeof item.price !== 'string') {
    return null
  }
  const count = Math.floor(Number(item.count))
  if (!Number.isFinite(count)) {
    return null
  }
  return {
    id: item.id,
    name: item.name,
    origin: typeof item.origin === 'string' ? item.origin : '',
    price: item.price,
    count: Math.min(99, Math.max(1, count)),
    checked: item.checked !== false,
    image: typeof item.image === 'string' ? item.image : '',
  }
}

/**
 * 读取本地购物车商品。
 * 从未保存过，或还是旧的三件商品版本时，返回 null，调用方改用十件默认商品。
 * 当前版本下保存过空数组时返回空数组，表示购物车已经被清空。
 */
export function readCartGoods(): CartGoods[] | null {
  const version = Number(wx.getStorageSync(CART_SEED_KEY))
  if (version !== CART_SEED_VERSION) {
    return null
  }
  const raw = wx.getStorageSync(CART_GOODS_KEY) as unknown
  if (raw === '' || raw === undefined || raw === null) {
    return null
  }
  if (!Array.isArray(raw)) {
    return null
  }
  return raw.map(normalizeGoods).filter((item): item is CartGoods => item !== null)
}

/**
 * 保存商品行，并把底部角标写成这些商品的件数之和。
 * 未勾选的商品也计入角标，勾选只影响结算金额。
 * @param goods 当前购物车商品
 * @returns 写入角标的件数
 */
export function saveCartGoods(goods: CartGoods[]): number {
  wx.setStorageSync(CART_SEED_KEY, CART_SEED_VERSION)
  wx.setStorageSync(CART_GOODS_KEY, goods)
  const count = goods.reduce((sum, item) => sum + item.count, 0)
  return setCartCount(count)
}
