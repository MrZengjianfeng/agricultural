/**
 * 把剩余秒数格式化成两位的时:分:秒。
 * 小于 0 的秒数按 0 处理，避免倒计时结束后出现负数。
 * @param total 剩余秒数
 * @returns 例如 02:18:36
 */
function formatRemain(total: number): string {
  const safe = Math.max(0, total)
  const hour = Math.floor(safe / 3600)
  const minute = Math.floor((safe % 3600) / 60)
  const second = safe % 60
  /**
   * 不足两位时在前面补 0。
   * @param value 时、分或秒
   */
  const pad = (value: number) => (value < 10 ? `0${value}` : `${value}`)
  return `${pad(hour)}:${pad(minute)}:${pad(second)}`
}

/**
 * 「今日鲜摘」区块。
 * 标题右侧显示距结束的倒计时，商品以横滑卡片展示。
 * 倒计时在组件挂载时启动，卸载时清除，避免离开页面后继续 setData。
 *
 * 属性：
 * - title 区块标题，默认「今日鲜摘」
 * - goods 横滑商品列表
 * - seconds 初始剩余秒数，默认 2 小时 18 分 36 秒
 *
 * 事件：
 * - select 点击商品卡片时触发，detail 与 goods-card 的 select 相同
 */
Component({
  properties: {
    /** 区块标题。 */
    title: {
      type: String,
      value: '今日鲜摘',
    },
    /** 横滑展示的商品。 */
    goods: {
      type: Array,
      value: [],
    },
    /** 倒计时开始时的剩余秒数。 */
    seconds: {
      type: Number,
      value: 2 * 60 * 60 + 18 * 60 + 36,
    },
  },
  data: {
    /** 已格式化的倒计时文案。 */
    remainText: '02:18:36',
    /** setInterval 返回的计时器编号，卸载时用来 clearInterval。 */
    timer: 0,
  },
  lifetimes: {
    /**
     * 挂载后立刻显示初始时间，并每秒减 1。
     * 剩余秒数存在闭包里，不放进 data，避免 setData 异步导致连减丢秒。
     */
    attached() {
      let remain = Number(this.properties.seconds) || 0
      this.setData({ remainText: formatRemain(remain) })
      const timer = setInterval(() => {
        if (remain > 0) {
          remain -= 1
        }
        this.setData({ remainText: formatRemain(remain) })
      }, 1000)
      this.setData({ timer })
    },
    /**
     * 组件卸载时停止倒计时。
     */
    detached() {
      clearInterval(this.data.timer)
    },
  },
  methods: {
    /**
     * 把商品卡片的 select 原样转发给页面。
     * @param e goods-card 抛出的事件，detail.item 为被点的商品
     */
    onSelect(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('select', e.detail)
    },
  },
})
