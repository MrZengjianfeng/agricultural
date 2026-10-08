import navLayout from '../../behaviors/nav-layout'
import { getCartCount } from '../../utils/cart'

/**
 * 分类、购物车、我的三个页共用的页面骨架。
 * 包含与首页一致的自定义顶栏、居中说明和底部导航。
 * 购物车角标在挂载和每次页面显示时从本地存储刷新。
 *
 * 属性：
 * - title 顶栏标题
 * - current 底部导航高亮项：category、cart、mine
 * - hint 页面中间的说明文字
 */
Component({
  behaviors: [navLayout],
  properties: {
    /** 顶栏居中标题。 */
    title: {
      type: String,
      value: '',
    },
    /** 当前页在底部导航中的标识。 */
    current: {
      type: String,
      value: 'home',
    },
    /** 内容区展示的说明。 */
    hint: {
      type: String,
      value: '',
    },
  },
  data: {
    /** 底部购物车角标，进入页面后会被本地存储覆盖。 */
    cartCount: 2,
  },
  pageLifetimes: {
    /**
     * 页面再次显示时刷新角标。
     * 从首页加购后切回来，件数要和存储保持一致。
     */
    show() {
      this.setData({ cartCount: getCartCount() })
    },
  },
  lifetimes: {
    /**
     * 首次挂载时读取购物车件数。
     */
    attached() {
      this.setData({ cartCount: getCartCount() })
    },
  },
})
