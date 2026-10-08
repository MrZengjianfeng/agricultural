/**
 * 购物车底部结算区。
 * 上面一行是运费提示，下面是圆角白卡片：全选、合计、去结算。
 * 管理商品时，页面把按钮文案换成「删除(件数)」，组件不区分这两种操作。
 *
 * 属性：
 * - tip 运费提示，例如「已满 39 元，免配送费」
 * - total 已勾选商品的合计，一位小数，不带人民币符号
 * - actionText 右侧按钮文案，例如「去结算(4)」
 * - allChecked 是否已经全选
 * - disabled 没有可结算或可删除的商品时为 true，按钮变浅
 *
 * 事件：
 * - toggle 点击全选圆点或「全选」文字时触发
 * - submit 点击右侧按钮时触发。禁用时也会触发，方便页面说明原因
 */
Component({
  properties: {
    /** 运费提示文案。 */
    tip: {
      type: String,
      value: '',
    },
    /** 合计金额，不带 ¥。 */
    total: {
      type: String,
      value: '0.0',
    },
    /** 右侧按钮上的文字。 */
    actionText: {
      type: String,
      value: '去结算(0)',
    },
    /** 是否全选。 */
    allChecked: {
      type: Boolean,
      value: false,
    },
    /** 没有勾选商品时按钮变浅。 */
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 点击全选。
     * 圆点和文字都进这里。勾选圆点用了 catchtap，不会和文字的点击叠成两次。
     */
    onToggle() {
      this.triggerEvent('toggle')
    },
    /**
     * 点击去结算或删除。
     * 是否真的能提交由页面根据勾选数量判断。
     */
    onSubmit() {
      this.triggerEvent('submit')
    },
  },
})
