// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [], // 分类
    categoryData: {},
    currentIndex: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory()
  },

  /**
   * 获取左侧分类列表
   */
  _getCategory() {
    getCategory().then(res => {

      const categories = res.data.data.category.list

      const categoryData = {}

      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }

      this.setData({
        categories,
        categoryData,
      })

      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },

  /**
   * 获取分类的某一项
   */
  _getSubcategory(currentIndex) {

    const { maitKey } = this.data.categories[currentIndex]

    getSubcategory(maitKey).then(res => {
      const tempCategoryData = this.data.categoryData

      tempCategoryData[currentIndex].subcategories = res.data.data.list
      // debugger

      this.setData({
        categoryData: tempCategoryData
      })
    })
  },


  /**
   * 获取分类详情商品
   */
  _getCategoryDetail(currentIndex) {
    const { miniWallkey } = this.data.categories[currentIndex]
    getCategoryDetail(miniWallkey, 'pop').then(res => {
      console.log(res)
      const { categoryData } = this.data
      categoryData[currentIndex].categoryDetail = res.data
      this.setData({
        categoryData
      })
    })
  },


  /**
   * 点击左侧分类
   */
  handleMenuClick(e) {
    const { currentIndex } = e.detail
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
    this._getCategoryDetail(currentIndex)

  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})