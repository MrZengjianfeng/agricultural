import navLayout from "../../behaviors/nav-layout";
import {
  LOGIN_STORAGE_KEY,
  loginAction,
  loginAgreement,
  loginBrand,
  loginDocs,
  loginImages,
} from "../../data/login";
import { wxLogin } from "../../services/api"

/** 本地登录标记。channel 目前只有微信这一条完成了的路径。 */
interface LoginUser {
  /** 登录方式。 */
  channel: string;
  /** 写入时间，毫秒时间戳。 */
  time: number;
}

/**
 * 读本地登录标记。
 * 没写过、或写坏了，都当作未登录。
 */
function readLogin(): LoginUser | null {
  const saved = wx.getStorageSync(LOGIN_STORAGE_KEY) as Partial<LoginUser> | "";
  if (!saved || typeof saved !== "object" || !saved.channel) {
    return null;
  }
  return {
    channel: saved.channel,
    time: saved.time || 0,
  };
}

/**
 * 登录页。
 * 把田标、封面、微信按钮、手机号入口和协议区拼成设计稿那一屏。
 * 右上角胶囊是微信自己画的，页面只用 nav-layout 把内容让到胶囊下面。
 * 微信登录会先看协议有没有勾上，再向微信要 code，并在本地记一笔。
 * 换 openId 仍走 app.ts 里的 wx.login，这里不把 code 发到控制台。
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
      return;
      if (!readLogin()) {
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
     * 微信一键登录。
     * 同意协议后向微信要临时 code，本地记下登录标记，再进入首页。
     * code 留给以后的服务端换会话，这一步不展示给用户。
     */
    onWechat() {
      if (!this.ensureAgreed()) {
        return;
      }
      wx.showLoading({ title: "登录中", mask: true });
      wx.login({
        success: (res) => {
          console.log('res',res)
          let params ={ 
            code:res.code,
          }
          // 去登录
          this.handleToLogin(params)
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: "微信登录失败", icon: "none" });
        },
      });
    },

    // 传值给后端
    handleToLogin(param:any){
      wxLogin(param).then((res)=>{

      }).catch(()=>{

      })
      wx.setStorageSync(LOGIN_STORAGE_KEY, '');
      wx.hideLoading();
      wx.reLaunch({ url: "/pages/index/index" });
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
