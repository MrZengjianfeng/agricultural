/** 单行商品件数的下限。设计稿里减号在 1 件时仍然显示，但不继续减少。 */
const MIN_COUNT = 1

/** 单行商品件数的上限，避免角标和金额被一次点得过大。 */
const MAX_COUNT = 99

/**
 * 购物车数量步进器。
 * 左边减、中间件数、右边加，外框是浅灰圆角矩形。
 * 组件不保存件数，父级收到 change 后把新的 count 传回来。
 *
 * 属性：
 * - count 当前件数
 *
 * 事件：
 * - change 件数发生变化时触发，detail.count 为新件数。
 *   已经是 1 再点减号、已经是 99 再点加号，都不会触发。
 *   按钮使用 catchtap，点击不会冒泡到商品卡片
 */
Component({
  properties: {
    /** 当前件数。 */
    count: {
      type: Number,
      value: 1,
    },
  },
  methods: {
    /**
     * 点击减号。
     * 少于等于 1 时停住，删除商品走顶栏的管理。
     */
    onMinus() {
      const count = Number(this.properties.count)
      if (!Number.isFinite(count) || count <= MIN_COUNT) {
        return
      }
      this.triggerEvent('change', { count: count - 1 })
    },
    /**
     * 点击加号。
     * 超过 99 时不再增加。
     */
    onPlus() {
      const count = Number(this.properties.count)
      const current = Number.isFinite(count) ? count : MIN_COUNT
      if (current >= MAX_COUNT) {
        return
      }
      this.triggerEvent('change', { count: current + 1 })
    },
  },
})
