// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const TOP_DISTANCE = 1000;

const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图
    recommends: [], // 推荐
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },

    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 请求轮播图以及推荐数据
    this._getMultidata()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  // ------------ 网络请求函数 --------------
  _getMultidata() {
    getMultiData().then(res => {
      // 取出轮播图和推荐的数据
      // console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      // 将banners和recommends放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    // 发送网络请求
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list
      // debugger
      const oldList = this.data.goods[type].list;

      oldList.push(...list)
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },








  // ------------ 事件监听函数 --------------
  handleTabClick(event) {
    // 取出index
    const { index } = event.detail

    // 设置currentType
    this.setData({
      currentType: types[index]
    })
  },

  onReachBottom() {
    // 上拉下载更多 => 请求更多数据
    this._getGoodsData(this.data.currentType)
  },
  onShareAppMessage() {
    
  },


  onPageScroll(options) {
    const { scrollTop } = options
    const flag = scrollTop >= TOP_DISTANCE
    if(flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }

  }
})