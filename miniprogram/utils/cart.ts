/** 购物车数量在本地存储中的键名。 */
const STORAGE_KEY = 'cartCount'

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
