// pages/category/category.js
import {
  getCategory,
  getSubcategory,
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory()
  },
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

    })
  },
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



  handleMenuClick(e) {
    const { currentIndex } = e.detail
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})