/**
 * 手机号登录的品牌区。
 * 上边复用圆形田标，中间是店名「田野鲜生」，下边是一行黑色说明。
 * 说明和微信登录页的口号不是同一句，颜色也更深，所以单独做这一块，不改微信那一屏。
 *
 * 属性：
 * - name 店名
 * - slogan 店名下的说明
 * - logo 田标路径，传给 login-logo
 */
Component({
  properties: {
    /** 大号深绿色店名。 */
    name: {
      type: String,
      value: '田野鲜生',
    },
    /** 店名下方的黑色说明。 */
    slogan: {
      type: String,
      value: '未注册手机号验证后即可登录',
    },
    /** 圆形田标路径。背景米色与登录页相同。 */
    logo: {
      type: String,
      value: '/assets/login/logo.png',
    },
  },
})
