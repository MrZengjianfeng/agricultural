import navLayout from '../../behaviors/nav-layout'
import { categoryMenus, filterGroups } from '../../data/category'
import { addCartCount, getCartCount } from '../../utils/cart'

/** 左侧菜单只需要 id 和名称，分组数据留在页面里按选中项取出。 */
const categories = categoryMenus.map((item) => ({
  id: item.id,
  name: item.name,
}))

/** 商品点击提示所需的字段。 */
interface GoodsBrief {
  /** 商品名称。 */
  name: string
  /** 现价，不带人民币符号。 */
  price: string
}

/**
 * 分类页。
 * 顶栏标题、搜索、左侧菜单、右侧商品和底部导航拼在这一页。
 * 默认展示「时令蔬菜 / 叶菜类」。从首页带 ?name= 进来时，改选对应分类。
 * 购物车角标在挂载和每次显示时从本地存储读取。
 */
Component({
  behaviors: [navLayout],
  data: {
    /** 左侧八个分类。 */
    categories,
    /** 当前选中的分类 id，默认时令蔬菜。 */
    currentId: categoryMenus[0].id,
    /** 右侧正在展示的分组。搜索命中商品时这里是过滤结果。 */
    groups: categoryMenus[0].groups,
    /** 右侧滚动定位的节点 id，切换分类时用来回到列表顶部。 */
    anchor: '',
    /** 底部购物车角标，进入页面后会被本地存储覆盖。 */
    cartCount: 2,
  },
  lifetimes: {
    /**
     * 首次进入时同步购物车件数。
     * 默认值只是设计稿上的占位，存储里可能已经被加购改过。
     */
    attached() {
      this.setData({ cartCount: getCartCount() })
    },
  },
  pageLifetimes: {
    /**
     * 从其他页加购后再回到分类页时，刷新角标。
     */
    show() {
      this.setData({ cartCount: getCartCount() })
    },
  },
  methods: {
    /**
     * 读取首页传来的分类名。
     * name 经过 encodeURIComponent，这里解码后按菜单名称匹配。
     * 匹配不到，或就是默认的时令蔬菜时，保持初始数据。
     * @param query 页面查询参数，name 为可选的分类名
     */
    onLoad(query: Record<string, string | undefined>) {
      if (!query.name) {
        return
      }
      const name = decodeURIComponent(query.name)
      const menu = categoryMenus.find((item) => item.name === name)
      if (!menu || menu.id === categoryMenus[0].id) {
        return
      }
      this.showCategory(menu.id)
    },
    /**
     * 展示某个分类的分组。
     * keyword 有值时只保留名称或规格命中的商品，并滚到过滤后的第一组。
     * 先把 anchor 清空再写入，否则连续两次定位到同一个 id 时滚动不会发生。
     * @param id 分类 id
     * @param keyword 商品关键字，为空表示展示该分类的全部商品
     */
    showCategory(id: string, keyword = '') {
      const menu = categoryMenus.find((item) => item.id === id) || categoryMenus[0]
      const groups = keyword ? filterGroups(menu.groups, keyword) : menu.groups
      const anchor = groups[0] ? `group-${groups[0].id}` : ''
      this.setData({ currentId: menu.id, groups, anchor: '' }, () => {
        this.setData({ anchor })
      })
    },
    /**
     * 点击左侧分类，展示该分类的全部商品。
     * @param e category-sidebar 的 change 事件，detail.id 为分类 id
     */
    onCategoryChange(e: WechatMiniprogram.CustomEvent<{ id: string }>) {
      this.showCategory(e.detail.id)
    },
    /**
     * 搜索分类或商品。
     * 空关键字提示输入。先匹配左侧分类名，命中就切换分类；
     * 否则在当前分类里按商品名和规格过滤；当前分类没有时，再找其他分类。
     * 都没有命中则提示，并保留当前列表。
     * @param e search-bar 的 search 事件，detail.value 为输入内容
     */
    onSearch(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
      const keyword = (e.detail.value || '').trim()
      if (!keyword) {
        wx.showToast({ title: '请输入分类或商品', icon: 'none' })
        return
      }
      const byName = categoryMenus.find((item) => item.name.indexOf(keyword) >= 0)
      if (byName) {
        this.showCategory(byName.id)
        return
      }
      const current = categoryMenus.find((item) => item.id === this.data.currentId) || categoryMenus[0]
      if (filterGroups(current.groups, keyword).length) {
        this.showCategory(current.id, keyword)
        return
      }
      const other = categoryMenus.find((item) => filterGroups(item.groups, keyword).length > 0)
      if (other) {
        this.showCategory(other.id, keyword)
        return
      }
      wx.showToast({ title: '没有找到相关商品', icon: 'none' })
    },
    /**
     * 点击商品行，提示名称和价格。
     * @param e category-panel 转发的 select 事件
     */
    onGoods(e: WechatMiniprogram.CustomEvent<{ item: GoodsBrief }>) {
      const { item } = e.detail
      wx.showToast({ title: `${item.name} ¥${item.price}`, icon: 'none' })
    },
    /**
     * 点击商品加号。
     * 本地件数加 1，同时刷新底部角标。
     */
    onAdd() {
      const cartCount = addCartCount(1)
      this.setData({ cartCount })
      wx.showToast({ title: '已加入购物车', icon: 'success' })
    },
  },
})
