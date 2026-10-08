/**
 * 个人中心资料区。
 * 左边是草帽头像，右边是昵称、脱敏手机号和绿色会员标。
 * 这一块直接铺在米色背景上，没有白卡片。
 *
 * 属性：
 * - name 昵称
 * - phone 脱敏手机号
 * - badge 会员标文案，例如「田野会员」
 */
Component({
  properties: {
    /** 昵称。 */
    name: {
      type: String,
      value: '田园小主',
    },
    /** 脱敏后的手机号。 */
    phone: {
      type: String,
      value: '138****6621',
    },
    /** 昵称下方的会员标。 */
    badge: {
      type: String,
      value: '田野会员',
    },
  },
})
