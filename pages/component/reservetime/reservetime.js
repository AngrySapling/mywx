// pages/component/reserve/reservetime.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reserve:{
      type:Object,
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange1() {
      this.triggerEvent('handleChange1', true)
    },
  }
})