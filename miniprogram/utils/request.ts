/**
 * 统一请求封装。页面和组件禁止直接 wx.request。
 * 成功时返回业务 data；HTTP 或业务 code 失败都走 reject。
 * 本地有 token 时自动写入 Authorization / token 头，业务接口不用再传。
 */
import { BASE_URL } from "../config/env";
import { getToken, pickToken } from "./auth";
import { userStore } from "../stores/user";

const TIMEOUT = 10000;
const SUCCESS_CODE = 200;
const UNAUTH_CODES = [401];

interface ApiBody {
  code?: unknown;
  msg?: unknown;
  message?: unknown;
  data?: unknown;
}

function isApiBody(value: unknown): value is ApiBody {
  return !!value && typeof value === "object";
}

function buildHeader(extra: Record<string, string> = {}): Record<string, string> {
  const header: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
    ...extra,
  };
  const token = getToken();
  if (token) {
    header.Authorization = `${token}`;
  }
  return header;
}

function handleAuthExpired(): void {
  userStore.logout();
}

/** token 若在信封层（body.token）而不在 data 里，合并进对象 payload，方便登录后落库 */
function unwrapData(body: ApiBody): unknown {
  const payload = body.data;
  const token = pickToken(body);
  if (
    token &&
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    !pickToken(payload)
  ) {
    return { ...payload, token };
  }
  return payload;
}

function pickMessage(body: unknown, fallback: string): string {
  if (!isApiBody(body)) return fallback;
  if (typeof body.msg === "string" && body.msg) return body.msg;
  if (typeof body.message === "string" && body.message) return body.message;
  return fallback;
}

interface RequestOptions {
  url: string;
  method?: WechatMiniprogram.RequestOption["method"];
  data?: WechatMiniprogram.RequestOption["data"];
  header?: Record<string, string>;
}

export function request({ url, method = "GET", data, header = {} }: RequestOptions): Promise<unknown> {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  console.log("[request] send", { method, url: fullUrl, data });

  return new Promise((resolve, reject) => {
    wx.request({
      url: fullUrl,
      method,
      data,
      timeout: TIMEOUT,
      header: buildHeader(header),
      success(res) {
        const { statusCode, data: body } = res;
        console.log("[request] recv", {
          method,
          url: fullUrl,
          statusCode,
          body,
        });
        const bizCode = isApiBody(body) ? Number(body.code) : NaN;

        if (statusCode === 401 || UNAUTH_CODES.includes(bizCode)) {
          handleAuthExpired();
          reject(new Error(pickMessage(body, "登录已失效")));
          return;
        }

        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error(pickMessage(body, "请求失败")));
          return;
        }

        if (!Number.isNaN(bizCode) && bizCode !== SUCCESS_CODE) {
          reject(new Error(pickMessage(body, "请求失败")));
          return;
        }

        if (isApiBody(body) && Object.prototype.hasOwnProperty.call(body, "data")) {
          resolve(unwrapData(body));
          return;
        }
        resolve(body);
      },
      fail(err) {
        console.log("[request] fail", { method, url: fullUrl, err });
        reject(new Error(err.errMsg || "网络异常"));
      },
    });
  });
}
