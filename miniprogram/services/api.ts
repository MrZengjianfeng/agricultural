import { request } from "../utils/request";

// 微信登录
export const fetchWxLogin = (params: any) => {
  return request({
    url: "/api/user/wxLogin",
    method: "POST",
    data: params,
  });
};

// 手机号登录
export const phoneLogin = (params: any) => {
  return request({
    url: "/api/user/phoneLogin",
    method: "POST",
    data: params,
  });
};

// 发送验证码
// phone: 手机号
export const sendSms = (params: any) => {
  return request({
    url: "/api/v1/sms/send",
    method: "POST",
    data: params,
  });
};
