// pages/detail/detail.js
const api = require("../../utils/api.js")
const WxParse = require('../../wxParse/wxParse.js');
// const { $Toast } = require('../../dist/base/index');
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    basicInfo: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    specGoods:{
      type:Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    specid:0,
    specname: "",
    addGoods: "",//加入购物车
    value1: 1,//输入的数量
    length: 0,
  },
  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {console.log("生命周期") },
    hide() { },
    resize() { },
  },
  methods: {
    close() {
      this.setData({
      })
      this.triggerEvent('close')
    },
    //规格选择
    spec: function (e) {
      let id = e.currentTarget.id;
      console.log(e,"规格")
      this.setData({
        specid:Number(id)
      })
    },
    //加入购物车
    addGoodsDetail() {
      let _this = this,spec;
      this.data.specGoods.forEach((res,index)=>{
        if(index === this.data.specid){
          spec = res
        }
      })
      
      if (this.data.value1.value1 > 999) {
        this.detail.value1 = 999
      }
      let specChildIds = this.data.specChildIds === 0 ? this.properties.propertyChildIds : this.data.specChildIds;
      let price = this.data.goodPrice === 0 ? this.properties.goodPrice : this.data.goodPrice;
      console.log(this.data.specChildIds,specChildIds,"查看")
      var methods = require("../../utils/method.js")
      let datas = {
        pic: this.data.basicInfo.pic,
        name: this.data.basicInfo.name,
        id: this.data.basicInfo.id,
        value: this.data.value1,
        specname: spec.name,
        propertyChildIds: spec.propertyChildIds,
        price: spec.price,
        check: true,
      }
      methods.addShopingcarts(datas, function (length) {
        app.getLength(String(length))
        _this.setData({
          length: length
        })
      })
      //获取长度
      // this.triggerEvent('myevent')
      this.close();
    },
    //获取购物车内部商品数量
    getLength: function () {
      let value = wx.getStorageSync('shops')
      this.setData({
        length: String(value.length)
      })
    },
    handleSuccess() {
      $Toast({
        content: '加入购物车成功',
        type: 'success'
      });
    },
    //弹框
    addShopCarts(e) {
      let name = e.currentTarget.id;
      let shopid = e.currentTarget.dataset.id;
      let specid = e.currentTarget.dataset.specid;
      let specname = e.currentTarget.dataset.specname;
      this.getPrice(shopid, specid);
      this.setData({
        addGoods: name,
        specid: specid,
        specname: specname
      })
    },
    handleChange1({ detail }) {
      this.setData({
        value1: detail.value
      })
    },
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    
  }
})
// onLoad: function (options) {
//   (options)
//   let optionss = {
//     id: "113909"
//   }
//   this.getDetail(optionss.id)
//   this.getReputation(optionss.id)
//   this.getLength();
// }