// components/component-tag-name.js
// const { $Toast } = require('../../dist/base/index');
// "i-rate": "../../dist/rate/index"
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    value1:1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //增加或者减少
    handleChange1({detail}) {
      this.setData({
        value1: detail.value
      })
    },
    //加入购物车
    btnAdd:function(){
      this.triggerEvent('addshop');
    }
  }
})
