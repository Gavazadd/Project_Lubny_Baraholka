import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._isInfo = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setIsInfo(bool) {
    this._isInfo = bool
  }
  setUser(user) {
    this._user = user
  }
  get isInfo() {
    return this._isInfo
  }
  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }
}