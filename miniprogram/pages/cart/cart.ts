import { defaultCartGoods, summarize } from '../../data/cart'
import type { CartGoods } from '../../data/cart'
import { readCartGoods, saveCartGoods } from '../../utils/cart'

/** 配送地址可选项。第一项和设计稿一致。 */
const ADDRESSES = ['杭州·西湖 张先生', '杭州·滨江 李女士', '杭州·余杭 王先生']

/**
 * 复制一份商品行。
 * 默认数据和本地缓存都不能直接改，避免下次进入时带着上一次的勾选。
 */
function copyGoods(list: CartGoods[]): CartGoods[] {
  return list.map((item) => ({ ...item }))
}

/** 首屏用的十件默认商品，避免先画出旧的三件再跳成十条。 */
const initialGoods = copyGoods(defaultCartGoods)
const initialSummary = summarize(initialGoods)

/**
 * 购物车页。
 * 把顶栏、地址、商品行、结算栏和底部导航拼在一起。
 * 商品行是金额和角标的来源：合计只算勾选的，角标算全部件数。
 * 点「管理」后，结算按钮变成删除，用来去掉已勾选的商品。
 */
Component({
  data: {
    /** 当前配送地址，展示在地址条里。 */
    address: ADDRESSES[0],
    /** 是否处于管理态。管理态下右侧按钮是删除。 */
    managing: false,
    /** 商品行。首次进入用十件默认商品，之后读本地记录。 */
    goods: initialGoods,
    /** 是否已经全选。 */
    allChecked: initialSummary.allChecked,
    /** 已勾选件数，按钮括号里的数字。 */
    selectedCount: initialSummary.selectedCount,
    /** 已勾选商品的合计。 */
    totalText: initialSummary.totalText,
    /** 运费提示。 */
    shipTip: initialSummary.shipTip,
    /** 右侧按钮文案。 */
    actionText: `去结算(${initialSummary.selectedCount})`,
    /** 没有勾选商品时按钮变浅。 */
    actionDisabled: initialSummary.selectedCount <= 0,
    /** 底部导航角标，等于全部商品件数。 */
    cartCount: initialSummary.pieceCount,
  },
  lifetimes: {
    /**
     * 首次进入时读取本地商品。
     * 还没存过就先展示设计稿，等用户改数量或删除后再写入。
     */
    attached() {
      this.restore()
    },
  },
  pageLifetimes: {
    /**
     * 每次显示时再读一次。
     * 底部导航用 reLaunch 打开本页，回来时要看到上次改过的件数。
     */
    show() {
      this.restore()
    },
  },
  methods: {
    /**
     * 用本地商品刷新页面。
     * 没有记录时用设计稿，先不写存储，这样只是打开购物车不会改掉首页原来的角标。
     * 记录是空数组时保持空购物车。
     */
    restore() {
      const stored = readCartGoods()
      if (stored === null) {
        this.render(copyGoods(defaultCartGoods))
        return
      }
      this.commit(stored)
    },
    /**
     * 刷新合计、运费提示和本页角标，不写本地存储。
     * @param goods 要展示的商品行
     * @param managing 编辑态。不传则保持当前状态
     */
    render(goods: CartGoods[], managing?: boolean) {
      const nextManaging = typeof managing === 'boolean' ? managing : this.data.managing
      const summary = summarize(goods)
      this.setData({
        goods,
        managing: nextManaging,
        allChecked: summary.allChecked,
        selectedCount: summary.selectedCount,
        totalText: summary.totalText,
        shipTip: summary.shipTip,
        actionText: nextManaging ? `删除(${summary.selectedCount})` : `去结算(${summary.selectedCount})`,
        actionDisabled: summary.selectedCount <= 0,
        cartCount: summary.pieceCount,
      })
    },
    /**
     * 保存商品行并刷新页面。
     * 保存时会把底部角标写成全部件数，其他页面回到前台后能对上。
     * @param goods 新的商品行
     * @param managing 编辑态。不传则保持当前状态
     */
    commit(goods: CartGoods[], managing?: boolean) {
      saveCartGoods(goods)
      this.render(goods, managing)
    },
    /**
     * 点击顶栏的管理或完成。
     * 只切换编辑态，不改商品勾选。
     */
    onManage() {
      this.render(this.data.goods, !this.data.managing)
    },
    /**
     * 点击配送地址，弹出可选地址。
     * 取消菜单时不改当前地址。
     */
    onAddress() {
      wx.showActionSheet({
        itemList: ADDRESSES,
        success: (res) => {
          const next = ADDRESSES[res.tapIndex]
          if (next) {
            this.setData({ address: next })
          }
        },
        fail() {
          return
        },
      })
    },
    /**
     * 勾选或取消一行商品。
     * @param e cart-goods 的 check 事件，detail.id 为商品 id
     */
    onCheck(e: WechatMiniprogram.CustomEvent<{ id: string }>) {
      const { id } = e.detail
      const goods = this.data.goods.map((item) => (
        item.id === id ? { ...item, checked: !item.checked } : item
      ))
      this.commit(goods)
    },
    /**
     * 修改一行商品的件数。
     * @param e cart-goods 的 count 事件
     */
    onCount(e: WechatMiniprogram.CustomEvent<{ id: string; count: number }>) {
      const { id, count } = e.detail
      const goods = this.data.goods.map((item) => (
        item.id === id ? { ...item, count } : item
      ))
      this.commit(goods)
    },
    /**
     * 全选或取消全选。
     * 当前已经全选时，这一下会把每一行都取消。
     */
    onToggleAll() {
      const checked = !this.data.allChecked
      const goods = this.data.goods.map((item) => ({ ...item, checked }))
      this.commit(goods)
    },
    /**
     * 点击去结算或删除。
     * 没有勾选时只提示。删除前再确认一次，避免误删。
     */
    onSubmit() {
      if (this.data.selectedCount <= 0) {
        wx.showToast({
          title: this.data.managing ? '请选择要删除的商品' : '请选择商品',
          icon: 'none',
        })
        return
      }
      if (this.data.managing) {
        const piece = this.data.selectedCount
        wx.showModal({
          title: '删除商品',
          content: `确定删除选中的 ${piece} 件商品吗？`,
          confirmText: '删除',
          confirmColor: '#1B8A3A',
          success: (res) => {
            if (!res.confirm) {
              return
            }
            const goods = this.data.goods.filter((item) => !item.checked)
            this.commit(goods, goods.length > 0)
            wx.showToast({ title: '已删除', icon: 'success' })
          },
        })
        return
      }
      wx.showToast({ title: `结算 ¥${this.data.totalText}`, icon: 'none' })
    },
  },
})
