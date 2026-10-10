import {
  PHONE_CODE_SECONDS,
  loginAgreement,
  loginBrand,
  loginDocs,
  loginImages,
  LOGIN_STORAGE_KEY,
} from "../../data/login";
import { fetchSendSms, fetchPhoneLogin } from "../../services/api";
import { userStore } from "../../stores/user";
import { pickToken } from "../../utils/auth";

/** 验证码倒计时的编号。离开页面时清掉，避免继续 setData。 */
let sendTimer = 0;

/**
 * 停掉获取验证码的倒计时。
 * 还没开始时直接返回。
 */
function stopSendTimer() {
  if (!sendTimer) {
    return;
  }
  clearInterval(sendTimer);
  sendTimer = 0;
}

/**
 * 手机号登录页。
 * 按设计稿拼顶栏、田标、输入卡片、登录按钮、返回入口和协议。
 * 右上角胶囊是微信自己画的。
 * 还没有短信服务，获取验证码只做倒计时；登录时检查手机号、四位验证码和协议，再在本地记一笔。
 */
Component({
  data: {
    /** 店名，和微信登录页同一句。 */
    brand: loginBrand,
    /** 圆形田标，复用已有小图，不再往主包加图。 */
    images: loginImages,
    /** 协议行文案。说明那一行这屏不展示。 */
    agreement: loginAgreement,
    /** 设计稿默认不勾选。 */
    agreed: false,
    /** 已输入的手机号，只含数字。 */
    phone: "13479481634",
    /** 已输入的验证码。 */
    code: "",
    /** 获取验证码按钮上的文字。 */
    sendLabel: "获取验证码",
    /** 剩余等待秒数。大于 0 时忽略再次点击。 */
    countdown: 0,
  },
  lifetimes: {
    /**
     * 离开页面时停掉倒计时。
     */
    detached() {
      stopSendTimer();
    },
  },
  methods: {
    /**
     * 返回微信登录。
     * 从登录页进来就后退；直接打开这一页时改去登录页，避免后退失败。
     */
    onBack() {
      if (getCurrentPages().length > 1) {
        wx.navigateBack();
        return;
      }
      wx.redirectTo({ url: "/pages/login/login" });
    },
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
     * 记下手机号。
     * 组件已经滤成数字。
     * @param e phone-form 的 phoneinput 事件
     */
    onPhoneInput(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
      this.setData({ phone: e.detail.value });
    },
    /**
     * 记下验证码。
     * @param e phone-form 的 codeinput 事件
     */
    onCodeInput(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
      this.setData({ code: e.detail.value });
    },
    /**
     * 开始或继续倒计时。
     * 秒数放在闭包里，不跟 setData 的异步抢。
     */
    startTimer() {
      stopSendTimer();
      let left = PHONE_CODE_SECONDS;
      this.setData({ countdown: left, sendLabel: `${left}s` });
      sendTimer = setInterval(() => {
        left -= 1;
        if (left <= 0) {
          stopSendTimer();
          this.setData({ countdown: 0, sendLabel: "获取验证码" });
          return;
        }
        this.setData({ countdown: left, sendLabel: `${left}s` });
      }, 1000);
    },
    /**
     * 获取验证码。
     * 手机号格式不对先拦住。等待中不重新计时。
     */
    handleSendCode() {
      if (this.data.countdown > 0) {
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.data.phone)) {
        wx.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      // 发起验证码请求
      this.handToSendSmsCode();
    },

    // 发送验证码请求
    handToSendSmsCode() {
      let params = {
        phone: this.data.phone,
      };
      fetchSendSms(params).then(() => {
        wx.showToast({ title: "验证码已发送", icon: "none" });
        this.startTimer();
      });
    },

    /**
     * 提交登录。
     * 协议、手机号、是否获取过验证码、四位验证码，少一项就停在这一页。
     * 通过后写入和微信登录相同的本地标记，再进入首页。
     */
    onSubmit() {
      if (!this.data.agreed) {
        wx.showToast({ title: "请先阅读并同意协议", icon: "none" });
        return;
      }
      // 验证手机号
      if (!/^1[3-9]\d{9}$/.test(this.data.phone)) {
        wx.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      if (!/^\d{6}$/.test(this.data.code)) {
        wx.showToast({ title: "请输入6位验证码", icon: "none" });
        return;
      }

      // 登录请求
      this.handleFetchLogin();
    },
    // 登录请求
    handleFetchLogin() {
      // 加载
      wx.showLoading({ title: "登录中", mask: true });
      // 请求
      fetchPhoneLogin({
        phone: this.data.phone,
        loginType: 2, // 验证码登录
        captcha: this.data.code,
      })
        .then((res) => {
          const token = pickToken(res);
          if (!token) {
            wx.hideLoading();
            wx.showToast({ title: "登录失败", icon: "none" });
            return;
          }
          userStore.loginSuccess(token);
          wx.setStorageSync(LOGIN_STORAGE_KEY, res);
          // 页面跳转
          wx.reLaunch({ url: "/pages/index/index" });
        })
        .catch(() => {
          // 结束加载
          wx.hideLoading();
        });
    },
  },
});
