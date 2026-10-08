// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

/**
 * 启动日志页。
 * 读取本地 logs，把时间戳格式化后按从新到旧展示。
 */
Component({
  data: {
    /** 已格式化的启动记录，每项包含 date 和 timeStamp。 */
    logs: [],
  },
  lifetimes: {
    /**
     * 挂载时从本地存储取出启动时间，并格式化成可读日期。
     */
    attached() {
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log
          }
        }),
      })
    }
  },
})
