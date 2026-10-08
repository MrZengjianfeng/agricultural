/**
 * 登录页中部的田地封面。
 * 白底圆角卡片包着一张日出菜地，左右比下面的登录按钮略宽。
 * 组件不处理点击，只负责把图按设计稿的白边和圆角摆出来。
 *
 * 属性：
 * - src 封面图路径
 */
Component({
  properties: {
    /** 菜地封面路径。 */
    src: {
      type: String,
      value: '/assets/login/field.jpg',
    },
  },
})
