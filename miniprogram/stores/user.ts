/**
 * 登录态。token 仍只走 utils/auth + storage，这里只持内存里的 isLoggedIn。
 * 页面用 createStoreBindings 订阅；写入口只走 loginSuccess / logout / setLoggedIn。
 */
import { observable, action } from "mobx-miniprogram";
import { clearToken, getToken, setToken } from "../utils/auth";

interface UserStore {
  isLoggedIn: boolean;
  setLoggedIn(isLoggedIn: boolean): void;
  loginSuccess(token: unknown): void;
  logout(): void;
}

export const userStore: UserStore = observable({
  isLoggedIn: !!getToken(),

  setLoggedIn: action(function (this: UserStore, isLoggedIn: boolean) {
    this.isLoggedIn = !!isLoggedIn;
  }),

  loginSuccess: action(function (this: UserStore, token: unknown) {
    setToken(token);
    this.isLoggedIn = true;
  }),

  logout: action(function (this: UserStore) {
    clearToken();
    this.isLoggedIn = false;
  }),
});
