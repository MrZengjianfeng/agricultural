import navLayout from "../../behaviors/nav-layout";
import {
  LOGIN_STORAGE_KEY,
  loginAction,
  loginAgreement,
  loginBrand,
  loginDocs,
  loginImages,
} from "../../data/login";
import { fetchWxLogin } from "../../services/api";
import { pickToken, getToken } from "../../utils/auth";
import { userStore } from "../../stores/user";

/**
 * 读本地登录标记。
 * 没写过、或写坏了，都当作未登录。
 */
function readLogin(): boolean {
  const login = userStore.isLoggedIn;
  const token = getToken();
  // 获取token
  if (login && token) {
    return true;
  }
  return false;
}

/**
 * 登录页。
 * 把田标、封面、微信按钮、手机号入口和协议区拼成设计稿那一屏。
 * 右上角胶囊是微信自己画的，页面只用 nav-layout 把内容让到胶囊下面。
 * 微信登录会先看协议有没有勾上，再向微信要头像昵称，最后用 code 和用户信息登录。
 */
Component({
  behaviors: [navLayout],
  data: {
    /** 店名和口号。 */
    brand: loginBrand,
    /** 田标和菜地封面。 */
    images: loginImages,
    /** 两个入口的文案。 */
    action: loginAction,
    /** 协议行文案。 */
    agreement: loginAgreement,
    /** 设计稿默认不勾选。 */
    agreed: false,
  },
  lifetimes: {
    /**
     * 已经登录过就直接进首页，避免每次冷启动都停在这一屏。
     */
    attached() {
      if (readLogin()) {
        return;
      }
      wx.reLaunch({ url: "/pages/index/index" });
    },
  },
  methods: {
    /**
     * 点击勾选圆或「我已阅读并同意」。
     * 在已勾和未勾之间切换。
     */
    onToggleAgree() {
      this.setData({ agreed: !this.data.agreed });
    },
    /**
     * 打开用户协议或隐私政策。
     * 只展示说明，不代替勾选。
     * @param e login-agreement 的 open 事件
     */
    onOpenDoc(
      e: WechatMiniprogram.CustomEvent<{ key: "agreement" | "privacy" }>,
    ) {
      const key = e.detail.key;
      const doc = loginDocs[key];
      if (!doc) {
        return;
      }
      wx.showModal({
        title: doc.title,
        content: doc.content,
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#63905F",
      });
    },
    /**
     * 协议没勾时拦住，并告诉用户先同意。
     * @returns 可以继续登录时为 true
     */
    ensureAgreed() {
      if (this.data.agreed) {
        return true;
      }
      wx.showToast({ title: "请先阅读并同意协议", icon: "none" });
      return false;
    },
    /**
     * 协议未勾选时由按钮抛出。
     * 提示文案与 ensureAgreed 相同。
     */
    onNeedAgree() {
      this.ensureAgreed();
    },
    /**
     * 用户关掉了头像昵称授权。
     * 没有用户信息就不继续向微信要 code。
     */
    onProfileDeny() {
      wx.showToast({ title: "需要授权用户信息后才能登录", icon: "none" });
    },
    /**
     * 微信一键登录。
     * 按钮已经拿到头像昵称，这里再向微信要临时 code，连同用户信息交给后端。
     * @param e login-wechat 的 login 事件，detail.userInfo 为微信用户信息
     */
    handToWechatLogin(
      e: WechatMiniprogram.CustomEvent<{
        userInfo: WechatMiniprogram.UserInfo;
      }>,
    ) {
      const userInfo = e.detail.userInfo;
      wx.showLoading({ title: "登录中", mask: true });
      wx.login({
        success: (res) => {
          if (!res.code) {
            wx.hideLoading();
            wx.showToast({ title: "微信登录失败", icon: "none" });
            return;
          }
          let params = {
            ...userInfo,
            code: res.code,
          };
          this.handleToFetchLogin(params);
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: "微信登录失败", icon: "none" });
        },
      });
    },

    /**
     * 把登录 code 和用户信息交给后端。
     * 拿到 token 才记登录标记并进入首页。
     * @param param code 与 wx.getUserProfile 返回的 userInfo
     */
    handleToFetchLogin(param: any) {
      fetchWxLogin(param)
        .then((res: any) => {
          const token = pickToken(res);
          if (!token) {
            wx.hideLoading();
            wx.showToast({ title: "登录失败", icon: "none" });
            return;
          }
          userStore.loginSuccess(token);
          wx.setStorageSync(LOGIN_STORAGE_KEY, res);
          wx.hideLoading();
          wx.reLaunch({ url: "/pages/index/index" });
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : "";
          wx.hideLoading();
          wx.showToast({ title: message || "登录失败", icon: "none" });
        });
    },

    /**
     * 进入手机号登录。
     * 协议勾选留在手机号那一屏，这里只负责打开页面。
     */
    onPhone() {
      wx.navigateTo({ url: "/pages/phone-login/phone-login" });
    },
  },
});
