/**
 * 个人中心的展示数据。
 * 文案和数字按设计稿来，页面只负责拼组件和处理点击。
 * 购物车角标不在这里，底部导航读的是 utils/cart.ts 里的件数。
 */

/** 头像右侧的用户信息。 */
export interface MineProfile {
  /** 昵称，设计稿是「田园小主」。 */
  name: string
  /** 脱敏手机号，中间四位用星号。 */
  phone: string
  /** 昵称下方的绿色会员标。 */
  badge: string
}

/** 优惠券、积分、收藏中的一项。 */
export interface MineStat {
  /** 点击时回传的标识。 */
  key: string
  /** 绿色大数字，用字符串是为了保留设计稿里的写法。 */
  value: string
  /** 数字下面的灰色说明。 */
  label: string
}

/** 订单状态入口。 */
export interface MineOrderItem {
  /** 点击时回传的标识：pay、ship、receive、review、refund。 */
  key: string
  /** 图标类名后缀，对应 styles/icons.less 里的 icon-xxx。 */
  icon: string
  /** 图标下面的文字。 */
  label: string
  /** 右上角红点数字。0 不显示，大于 99 时组件显示 99+。 */
  badge: number
}

/** 菜单里的一行。 */
export interface MineMenuItem {
  /** 点击时回传的标识：address、favorite、service、setting。 */
  key: string
  /** 左侧图标类名后缀。 */
  icon: string
  /** 行标题。 */
  label: string
}

/** 农场直供会员开通条。 */
export interface MineMember {
  /** 左侧主标题。 */
  title: string
  /** 主标题下面的小字。 */
  subtitle: string
  /** 右侧白按钮上的文字。 */
  action: string
}

/** 头像右侧三行字，和设计稿一致。 */
export const mineProfile: MineProfile = {
  name: '田园小主',
  phone: '138****6621',
  badge: '田野会员',
}

/** 白卡片里的三项数据，顺序从左到右。 */
export const mineStats: MineStat[] = [
  { key: 'coupon', value: '3', label: '优惠券' },
  { key: 'point', value: '1280', label: '积分' },
  { key: 'favorite', value: '12', label: '收藏' },
]

/**
 * 我的订单五个入口。
 * 待付款带红色数字 1，其余没有角标。
 * icon 必须和 icons.less 里的类名对得上。
 */
export const mineOrders: MineOrderItem[] = [
  { key: 'pay', icon: 'pay', label: '待付款', badge: 1 },
  { key: 'ship', icon: 'parcel', label: '待发货', badge: 0 },
  { key: 'receive', icon: 'receive', label: '待收货', badge: 0 },
  { key: 'review', icon: 'review', label: '待评价', badge: 0 },
  { key: 'refund', icon: 'refund', label: '退款/售后', badge: 0 },
]

/** 开通条文案。 */
export const mineMember: MineMember = {
  title: '农场直供会员',
  subtitle: '每月领新鲜券',
  action: '去开通',
}

/** 底部四行菜单，顺序和设计稿一致。 */
export const mineMenus: MineMenuItem[] = [
  { key: 'address', icon: 'address', label: '收货地址' },
  { key: 'favorite', icon: 'bookmark', label: '我的收藏' },
  { key: 'service', icon: 'service', label: '联系客服' },
  { key: 'setting', icon: 'user', label: '设置' },
]
