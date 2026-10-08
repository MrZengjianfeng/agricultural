/**
 * 通用自定义导航栏。
 * 支持返回、回首页、加载态和标题；左右两侧也可以用插槽替换。
 * 日志页使用这个组件。首页顶栏是单独的 home-navbar，因为要放配送地址。
 *
 * 属性：
 * - extClass 追加到根节点的类名
 * - title 中间标题；为空时使用 center 插槽
 * - background 导航背景色
 * - color 文字和图标颜色
 * - back 是否显示返回按钮，默认显示
 * - loading 是否在标题左侧显示加载图标
 * - homeButton 是否显示回首页按钮
 * - animated 隐藏导航时是否用透明度动画
 * - show 是否显示导航；隐藏时仍保留占位高度
 * - delta 返回时后退的页面层数
 *
 * 事件：
 * - back 点击返回后触发，detail.delta 为后退层数
 *
 * 插槽：
 * - left 未显示返回和首页按钮时的左侧内容
 * - center 未传 title 时的中间内容
 * - right 右侧内容，默认留空给微信胶囊
 */
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: ''
  },
  lifetimes: {
    /**
     * 按胶囊按钮和系统信息计算左右留白、安全区高度。
     * 安卓和开发者工具需要把状态栏高度加进导航，iOS 使用安全区变量。
     */
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: (res) => {
          const isAndroid = res.platform === 'android'
          const isDevtools = res.platform === 'devtools'
          this.setData({
            ios: !isAndroid,
            innerPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
            leftWidth: `width: ${res.windowWidth - rect.left }px`,
            safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
          })
        }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * show 属性变化时更新导航的显隐样式。
     * animated 为 true 时用透明度过渡，否则直接 display 切换。
     * @param show 是否显示导航内容
     */
    _showChange(show: boolean) {
      const animated = this.data.animated
      let displayStyle = ''
      if (animated) {
        displayStyle = `opacity: ${
          show ? '1' : '0'
        };transition:opacity 0.5s;`
      } else {
        displayStyle = `display: ${show ? '' : 'none'}`
      }
      this.setData({
        displayStyle
      })
    },
    /**
     * 点击返回。
     * delta 大于 0 时调用 navigateBack，并抛出 back 事件给页面。
     */
    back() {
      const data = this.data
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta
        })
      }
      this.triggerEvent('back', { delta: data.delta }, {})
    }
  },
})
