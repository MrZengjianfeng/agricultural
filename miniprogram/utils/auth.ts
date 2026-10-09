/**
 * 登录 token：登录成功写入，request 发请求时带上，401 时清掉。
 * 业务接口不要自己读 storage 再塞参，走 request 即可。
 */
import { STORAGE_KEYS } from "../config/storage";

export function getToken(): string {
  return wx.getStorageSync(STORAGE_KEYS.TOKEN) || "";
}

export function setToken(token: unknown): void {
  const value = token == null ? "" : String(token);
  if (!value) {
    wx.removeStorageSync(STORAGE_KEYS.TOKEN);
    return;
  }
  wx.setStorageSync(STORAGE_KEYS.TOKEN, value);
}

export function clearToken(): void {
  wx.removeStorageSync(STORAGE_KEYS.TOKEN);
}

interface TokenBody {
  token?: unknown;
  access_token?: unknown;
  accessToken?: unknown;
  auth_token?: unknown;
  data?: unknown;
  user?: unknown;
}

function isTokenBody(value: unknown): value is TokenBody {
  return !!value && typeof value === "object";
}

/**
 * 从登录接口返回里抽出 token。
 * 兼容顶层 / data / user，以及 token、access_token、accessToken。
 */
export function pickToken(result: unknown): string {
  if (result == null || result === "") {
    return "";
  }
  if (typeof result === "string") {
    return result;
  }
  if (!isTokenBody(result)) {
    return "";
  }

  const from = (obj: unknown): string => {
    if (!isTokenBody(obj)) {
      return "";
    }
    const raw = obj.token || obj.access_token || obj.accessToken || obj.auth_token || "";
    return typeof raw === "string" ? raw : "";
  };

  const data = isTokenBody(result.data) ? result.data : undefined;
  return from(result) || from(result.data) || from(result.user) || from(data && data.user) || "";
}
