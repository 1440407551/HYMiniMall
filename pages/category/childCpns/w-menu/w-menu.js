// components/w-menu/w-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMenuItemClick(e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
      const { currentIndex } = this.data
      this.triggerEvent('menuClick', { currentIndex }, {})
    }
  }
})
