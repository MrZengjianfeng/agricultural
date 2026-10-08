/**
 * 登录页顶部的圆形田标。
 * 谷仓、幼苗和两道田垄是一整张小图，不再用视图拼轮廓，避免和设计稿走样。
 * 图片背景是登录页同色的米色，方图四角会融进页面。
 *
 * 属性：
 * - src 田标路径，默认用包内裁好的图
 */
Component({
  properties: {
    /** 田标图片路径。 */
    src: {
      type: String,
      value: '/assets/login/logo.png',
    },
  },
})
