/**
 * 底部四个入口对应的页面路径。
 * 用 reLaunch 切换，避免自定义 tab 把页面一层层压进栈。
 */
const ROUTES: Record<string, string> = {
  home: '/pages/index/index',
  category: '/pages/category/category',
  cart: '/pages/cart/cart',
  mine: '/pages/mine/mine',
}

/**
 * 自定义底部导航。
 * 首页为选中态时图标和文字是绿色，购物车图标右上角显示件数。
 *
 * 属性：
 * - current 当前页标识：home、category、cart、mine
 * - cartCount 购物车角标数字，小于等于 0 时不显示；大于 99 时显示 99+
 *
 * 点击当前页不会重复跳转。
 */
Component({
  properties: {
    /** 当前高亮的 tab 标识。 */
    current: {
      type: String,
      value: 'home',
    },
    /** 购物车商品件数。 */
    cartCount: {
      type: Number,
      value: 0,
    },
  },
  data: {
    /** 底部四个入口，顺序与设计稿一致。 */
    tabs: [
      { key: 'home', label: '首页', icon: 'home' },
      { key: 'category', label: '分类', icon: 'category' },
      { key: 'cart', label: '购物车', icon: 'cart' },
      { key: 'mine', label: '我的', icon: 'mine' },
    ],
  },
  methods: {
    /**
     * 切换底部 tab。
     * 点中当前页、或标识没有对应路径时直接返回。
     * @param e 点击事件，dataset.key 为 tab 标识
     */
    onTap(e: WechatMiniprogram.TouchEvent) {
      const key = String(e.currentTarget.dataset.key || '')
      if (!key || key === this.properties.current) {
        return
      }
      const url = ROUTES[key]
      if (!url) {
        return
      }
      wx.reLaunch({ url })
    },
  },
})
