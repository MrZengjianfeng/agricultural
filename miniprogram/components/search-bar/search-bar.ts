/**
 * 首页搜索框。
 * 外观是圆角白底输入框，键盘右下角为「搜索」。
 *
 * 属性：
 * - placeholder 输入框占位文案
 *
 * 事件：
 * - search 用户点击键盘搜索时触发，detail.value 为输入内容，可能包含首尾空格
 */
Component({
  properties: {
    /** 未输入时显示的灰色提示。 */
    placeholder: {
      type: String,
      value: '搜索新鲜果蔬、土鸡蛋...',
    },
  },
  methods: {
    /**
     * 键盘确认搜索。
     * @param e 输入框 confirm 事件，detail.value 是当前输入
     */
    onConfirm(e: { detail: { value: string } }) {
      this.triggerEvent('search', { value: e.detail.value })
    },
  },
})
