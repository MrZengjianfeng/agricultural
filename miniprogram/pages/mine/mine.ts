import { mineMember, mineMenus, mineOrders, mineProfile, mineStats } from '../../data/mine'
import { getCartCount } from '../../utils/cart'

/** 收货地址可选项。和购物车页用同一组示例地址。 */
const ADDRESSES = ['杭州·西湖 张先生', '杭州·滨江 李女士', '杭州·余杭 王先生']

/**
 * 个人中心。
 * 把顶栏、资料、数据、订单、会员条、菜单和底部导航拼在一起。
 * 展示数据来自 data/mine.ts。点击只做反馈，订单和地址页面还没做。
 * 底部购物车角标跟本地件数走，不写死设计稿里的数字。
 */
Component({
  data: {
    /** 昵称、手机号、会员标。 */
    profile: mineProfile,
    /** 优惠券、积分、收藏。 */
    stats: mineStats,
    /** 五个订单入口。 */
    orders: mineOrders,
    /** 农场直供会员开通条。 */
    member: mineMember,
    /** 地址、收藏、客服、设置。 */
    menus: mineMenus,
    /** 底部购物车角标。进入页面后按本地存储刷新。 */
    cartCount: 2,
  },
  lifetimes: {
    /**
     * 首次进入时读取购物车件数。
     */
    attached() {
      this.syncCart()
    },
  },
  pageLifetimes: {
    /**
     * 每次显示时再读一次角标。
     * 在购物车改过件数后，从底部导航回来要能对上。
     */
    show() {
      this.syncCart()
    },
  },
  methods: {
    /**
     * 用本地购物车件数刷新底部角标。
     */
    syncCart() {
      this.setData({ cartCount: getCartCount() })
    },
    /**
     * 点击顶栏齿轮或菜单里的设置。
     */
    onSetting() {
      wx.showToast({ title: '设置', icon: 'none' })
    },
    /**
     * 点击优惠券、积分或收藏。
     * @param e mine-stats 的 select 事件
     */
    onStat(e: WechatMiniprogram.CustomEvent<{ key: string; label: string }>) {
      wx.showToast({ title: e.detail.label || '我的', icon: 'none' })
    },
    /**
     * 点击查看全部订单。
     */
    onAllOrders() {
      wx.showToast({ title: '全部订单', icon: 'none' })
    },
    /**
     * 点击一个订单状态。
     * @param e mine-orders 的 select 事件
     */
    onOrder(e: WechatMiniprogram.CustomEvent<{ key: string; label: string }>) {
      wx.showToast({ title: e.detail.label || '订单', icon: 'none' })
    },
    /**
     * 点击去开通。
     * 先确认，确认后只提示已提交，不真正开通会员。
     */
    onOpenMember() {
      wx.showModal({
        title: '农场直供会员',
        content: '开通后每月可领新鲜券。',
        confirmText: '去开通',
        confirmColor: '#1B8A3A',
        success: (res) => {
          if (!res.confirm) {
            return
          }
          wx.showToast({ title: '已提交开通', icon: 'none' })
        },
      })
    },
    /**
     * 点击菜单行。
     * 地址弹出可选列表，客服说明服务时间，设置和顶栏齿轮一样。
     * @param e mine-menu 的 select 事件
     */
    onMenu(e: WechatMiniprogram.CustomEvent<{ key: string; label: string }>) {
      const { key, label } = e.detail
      if (key === 'address') {
        wx.showActionSheet({
          itemList: ADDRESSES,
          success: () => {
            wx.showToast({ title: '已选择收货地址', icon: 'none' })
          },
          fail() {
            return
          },
        })
        return
      }
      if (key === 'service') {
        wx.showModal({
          title: '联系客服',
          content: '服务时间 9:00-21:00，订单问题可以在这里留言。',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#1B8A3A',
        })
        return
      }
      if (key === 'setting') {
        this.onSetting()
        return
      }
      wx.showToast({ title: label || '我的', icon: 'none' })
    },
  },
})
