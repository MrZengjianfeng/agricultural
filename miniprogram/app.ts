// app.ts
/**
 * 小程序入口。
 * 启动时记录一次本地日志，并向微信换取登录 code。
 */
App<IAppOption>({
  globalData: {},
  /**
   * 小程序冷启动时执行。
   * 把当前时间插入本地 logs 的开头，并调用 wx.login 取得临时 code。
   */
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})