import { banners, categories, farmGoods, freshGoods, FLASH_SECONDS } from '../../data/home'
import { addCartCount, getCartCount } from '../../utils/cart'

/** 配送地址可选项，点击顶栏地址后在操作菜单中展示。 */
const LOCATIONS = ['杭州·西湖', '杭州·滨江', '杭州·余杭', '上海·浦东']

/** 商品点击提示所需的最少字段。 */
interface GoodsItem {
  /** 商品名称。 */
  name: string
  /** 现价，不带人民币符号。 */
  price: string
}

/**
 * 首页。
 * 负责拼装导航、搜索、轮播、分类、今日鲜摘和农场直发，并处理这些模块抛出的事件。
 * 商品数据来自 data/home.ts，购物车件数来自本地存储。
 */
Component({
  data: {
    /** 当前配送地址，展示在顶栏左侧。 */
    location: '杭州·西湖',
    /** 顶部轮播。 */
    banners,
    /** 八宫格分类。 */
    categories,
    /** 今日鲜摘商品。 */
    freshGoods,
    /** 农场直发商品。 */
    farmGoods,
    /** 今日鲜摘倒计时的初始秒数。 */
    flashSeconds: FLASH_SECONDS,
    /** 底部购物车角标，页面显示时会按本地存储刷新。 */
    cartCount: 2,
  },
  pageLifetimes: {
    /**
     * 每次显示首页时同步购物车角标。
     * 其他页面也可能改过件数，回到首页要用最新值。
     */
    show() {
      this.setData({ cartCount: getCartCount() })
    },
  },
  methods: {
    /**
     * 点击顶栏配送地址，弹出可选地址。
     * 用户取消菜单时不改地址；选中后只更新本页展示。
     */
    onLocationTap() {
      wx.showActionSheet({
        itemList: LOCATIONS,
        success: (res) => {
          const next = LOCATIONS[res.tapIndex]
          if (next) {
            this.setData({ location: next })
          }
        },
        fail() {
          return
        },
      })
    },
    /**
     * 搜索框点击键盘搜索。
     * 去掉首尾空格后，空内容提示输入，有内容则提示正在搜索的关键词。
     * @param e search-bar 的 search 事件，detail.value 为输入内容
     */
    onSearch(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
      const value = (e.detail.value || '').trim()
      if (!value) {
        wx.showToast({ title: '请输入想买的食材', icon: 'none' })
        return
      }
      wx.showToast({ title: `搜索「${value}」`, icon: 'none' })
    },
    /**
     * 点击轮播卡片。
     * 目前用标题做反馈，后续可按 item.id 跳到活动页。
     * @param e promo-banner 的 action 事件，detail.item.title 为轮播标题
     */
    onBanner(e: WechatMiniprogram.CustomEvent<{ item: { title: string } }>) {
      wx.showToast({ title: e.detail.item.title, icon: 'none' })
    },
    /**
     * 点击分类入口，进入分类页并带上分类名。
     * @param e category-grid 的 select 事件，detail.item.name 为分类名
     */
    onCategory(e: WechatMiniprogram.CustomEvent<{ item: { name: string } }>) {
      const name = encodeURIComponent(e.detail.item.name)
      wx.reLaunch({ url: `/pages/category/category?name=${name}` })
    },
    /**
     * 点击商品卡片，提示商品名和价格。
     * @param e fresh-pick 或 farm-direct 转发的 select 事件
     */
    onGoods(e: WechatMiniprogram.CustomEvent<{ item: GoodsItem }>) {
      const { item } = e.detail
      wx.showToast({ title: `${item.name} ¥${item.price}`, icon: 'none' })
    },
    /**
     * 点击农场商品的加号。
     * 本地件数加 1，同时刷新底部角标并提示已加入购物车。
     */
    onAdd() {
      const cartCount = addCartCount(1)
      this.setData({ cartCount })
      wx.showToast({ title: '已加入购物车', icon: 'success' })
    },
    /**
     * 点击「农场直发」的查看全部。
     * 列表页尚未接入，先给出提示。
     */
    onMoreFarm() {
      wx.showToast({ title: '农场直发列表', icon: 'none' })
    },
  },
})
