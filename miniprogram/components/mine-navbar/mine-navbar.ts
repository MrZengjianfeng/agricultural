import navLayout from '../../behaviors/nav-layout'

/**
 * 个人中心顶栏。
 * 设计稿这一行没有标题，只在微信胶囊左边放一枚设置齿轮。
 * 状态栏时间和右上角胶囊由微信绘制，组件用 nav-layout 把齿轮让开。
 *
 * 事件：
 * - setting 点击齿轮时触发。页面负责打开设置
 */
Component({
  behaviors: [navLayout],
  methods: {
    /**
     * 点击设置齿轮。
     * 组件不跳转，把 setting 交给页面，和菜单里的「设置」走同一条逻辑。
     */
    onSetting() {
      this.triggerEvent('setting')
    },
  },
})
