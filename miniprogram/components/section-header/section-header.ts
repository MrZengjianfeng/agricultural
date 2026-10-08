/**
 * 首页区块标题。
 * 左侧是绿色竖条加标题，右侧通过 extra 插槽放倒计时或「查看全部」。
 *
 * 属性：
 * - title 区块标题
 *
 * 插槽：
 * - extra 标题右侧的自定义内容
 */
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    /** 竖条右侧的标题文字。 */
    title: {
      type: String,
      value: '',
    },
  },
})
