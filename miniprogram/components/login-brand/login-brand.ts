/**
 * 登录页品牌区。
 * 上边是圆形田标，中间是店名「田野鲜生」，下边是一行口号。
 * 三样都水平居中，不包白卡片，直接铺在米色背景上。
 *
 * 属性：
 * - name 店名
 * - slogan 店名下的口号
 * - logo 田标图片路径，传给 login-logo
 */
Component({
  properties: {
    /** 大号店名。 */
    name: {
      type: String,
      value: '田野鲜生',
    },
    /** 店名下方的口号。 */
    slogan: {
      type: String,
      value: '当季直供 · 从田间到餐桌',
    },
    /** 圆形田标路径。 */
    logo: {
      type: String,
      value: '/assets/login/logo.png',
    },
  },
})
