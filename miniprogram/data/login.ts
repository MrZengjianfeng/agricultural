/** 登录成功后写入本地的标记。下次冷启动读到它就直接进首页。 */
export const LOGIN_STORAGE_KEY = 'loginUser'

/**
 * 登录页品牌文案，和设计稿标题、口号一致。
 */
export const loginBrand = {
  /** 店名，大号深绿色。 */
  name: '田野鲜生',
  /** 店名下方的一行说明，中间是间隔号。 */
  slogan: '当季直供 · 从田间到餐桌',
}

/**
 * 登录页用到的两张图。
 * 都从设计稿裁出后再压缩，避免为了这一屏再往主包塞大图。
 */
export const loginImages = {
  /** 圆形田标：谷仓、幼苗和田垄。背景米色与登录页相同。 */
  logo: '/assets/login/logo.png',
  /** 白卡片里的日出菜地。 */
  field: '/assets/login/field.jpg',
}

/** 两个登录入口的按钮文案。 */
export const loginAction = {
  /** 灰绿色胶囊按钮。 */
  wechat: '微信一键登录',
  /** 按钮下方的文字入口。 */
  phone: '手机号登录',
}

/** 底部协议行。链接和普通文字拆开，方便分别点击。 */
export const loginAgreement = {
  /** 勾选圆右边的普通文字。 */
  lead: '我已阅读并同意',
  /** 绿色书名号，点开用户协议。 */
  agreement: '《用户协议》',
  /** 两个书名号中间的「和」。 */
  join: '和',
  /** 绿色书名号，点开隐私政策。 */
  privacy: '《隐私政策》',
  /** 协议行下面的灰色说明。 */
  hint: '登录即表示同意授权获取微信头像与昵称',
}

/** 协议弹层。文案只说明用途，不是完整法律文本。 */
export const loginDocs = {
  agreement: {
    title: '用户协议',
    content: '欢迎使用田野鲜生。你可以用它浏览当季农产品、下单和查看配送。登录后请保管好账号，不要把验证信息交给他人。',
  },
  privacy: {
    title: '隐私政策',
    content: '微信登录时，我们会按你的授权使用头像和昵称来展示个人资料。手机号只在你主动选择手机号登录时收集，不用于和订单无关的用途。',
  },
}
