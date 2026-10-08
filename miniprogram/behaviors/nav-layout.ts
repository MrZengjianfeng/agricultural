/**
 * 自定义导航的尺寸适配。
 * 首页顶栏和占位页顶栏共用，用来避开状态栏和右上角微信胶囊。
 *
 * 注入的数据：
 * - statusBarHeight 状态栏高度，单位 px，用来做顶部内边距
 * - navBarHeight 导航内容区高度，单位 px，与胶囊垂直居中对齐
 * - capsuleGap 右侧应留出的宽度，单位 px，避免文字压到胶囊
 */
export default Behavior({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    capsuleGap: 96,
  },
  lifetimes: {
    /**
     * 组件挂载时读取设备和胶囊位置。
     * 开发者工具里胶囊矩形偶尔是 0，这时用状态栏高度和窗口宽度兜底，保证顶栏仍有高度。
     */
    attached() {
      const system = wx.getSystemInfoSync()
      const menu = wx.getMenuButtonBoundingClientRect()
      const statusBarHeight = system.statusBarHeight || 20
      const menuTop = menu.top || statusBarHeight + 4
      const menuHeight = menu.height || 32
      const menuLeft = menu.left || system.windowWidth - 96
      const navBarHeight = Math.max((menuTop - statusBarHeight) * 2 + menuHeight, 44)
      const capsuleGap = Math.max(system.windowWidth - menuLeft + 8, 12)
      this.setData({
        statusBarHeight,
        navBarHeight,
        capsuleGap,
      })
    },
  },
})
