/**
 * 环境与网关。业务代码只 import BASE_URL，不要自己写 env 开关。
 * 目前三套环境共用正式网关，后续有独立域名时只改这里。
 */
const { miniProgram } = wx.getAccountInfoSync()

export const ENV_VERSION = miniProgram.envVersion

const BASE_URL_MAP = {
  develop: 'http://127.0.0.1:8081',
  trial: 'http://127.0.0.1:8081',
  release: 'http://127.0.0.1:8081',
}

export const BASE_URL = BASE_URL_MAP[ENV_VERSION] || BASE_URL_MAP.release
