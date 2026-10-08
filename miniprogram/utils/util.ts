/**
 * 把日期格式化成「年/月/日 时:分:秒」。
 * 月、日、时、分、秒不足两位时前面补 0。
 * @param date 要格式化的时间
 * @returns 例如 2026/10/08 19:36:00
 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * 把数字转成至少两位的字符串。
 * @param n 要补零的数字
 * @returns 0 到 9 返回 00 到 09，其余返回原数字字符串
 */
const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
