/**
 * 分类页。
 * 使用 tab-page 骨架。从首页点分类进来时，query.name 会换成对应的上架提示。
 */
Component({
  data: {
    /** 页面中间的说明。未带分类名时使用默认文案。 */
    hint: '挑选当季蔬果、蛋奶和粮油',
  },
  methods: {
    /**
     * 读取页面参数里的分类名。
     * name 由首页 encodeURIComponent 后放进路径，这里再解码展示。
     * @param query 页面查询参数，name 为可选的分类名
     */
    onLoad(query: Record<string, string | undefined>) {
      if (!query.name) {
        return
      }
      const name = decodeURIComponent(query.name)
      this.setData({ hint: `「${name}」商品即将上架` })
    },
  },
})
