import {makeAutoObservable} from "mobx";

export default class DeviceStore {
  constructor() {
    this._categories = []
    this._offerTypes = []
    this._devices = []
    this._selectedCategory = {}
    this._selectedOfferType = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 2
    makeAutoObservable(this)
  }

  setCategories(categories) {
    this._categories = categories
  }
  setOfferTypes(offerTypes) {
    this._offerTypes = offerTypes
  }
  setDevices(devices) {
    this._devices = devices
  }

  setSelectedCategory(category) {
    this.setPage(1)
    this._selectedCategory = category
  }
  setSelectedOfferType(offerType) {
    this.setPage(1)
    this._selectedOfferType = offerType
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  get categories() {
    return this._categories
  }
  get offerTypes() {
    return this._offerTypes
  }
  get devices() {
    return this._devices
  }
  get selectedCategory() {
    return this._selectedCategory
  }
  get selectedOfferType() {
    return this._selectedOfferType
  }
  get totalCount() {
    return this._totalCount
  }
  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
}