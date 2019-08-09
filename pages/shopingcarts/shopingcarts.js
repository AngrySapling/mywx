// pages/shopingcarts/shopingcarts.js
const api = require('../../utils/api.js');
const watch = require("../../utils/watch.js");
import Dialog from '../../dist/dialog/dialog';
// "i-modal": "../../dist/modal/index",
  // "i-swipeout": "../../dist/swipeout/index",
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopcarts: [],
    value1: 1,//输入的数量
    shopid: 0,//判断商品的id
    paystatusid: 0,// 结算状态
    deliverid: 0,
    edit:true,//切换删除与编辑状态
    checkStatus:true,//选中状态
    allMoney:0,//所有价格
    editStatus:[{
      id:1,
      name:"完成",
      status:false,
      btnName:"删除商品"
    },{
      id:0,
      name:"编辑",
      status:true,
      btnName:"提交订单"
    }],

  },
  //数量
  onChange(e){
    this.setData({
      value1:e.detail
    })
  },
  //删除
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  //提交订单
  tapbuy(e) {
    console.log(e)
    let id = e.currentTarget.id;
    if(id === "0"){//提交订单

    }else{//删除
      let data = this.data.shopcarts;
      var index = 0;
      for(var i=0,length=data.length;i < length;i++){
        if (data[index].check === true) {
          data.splice(index, 1)
        }else{
          index++
        }
      }
      this.data.shopcarts.forEach((res) => {
        res.check = true;
      })
      this.setData({
        edit:true
      })
      this.watchCekck(data)
    }
    console.log(this.data.deliverid, this.data.paystatusid)
  },
  editChange(e){
    console.log(e)
    let id = e.currentTarget.id;
    this.setData({
      edit:!this.data.edit
    })
    console.log(id,typeof id)
    if(id === "0"){
      console.log(321)
      this.data.shopcarts.forEach((res)=>{
        res.check = false;
      })
    }else{
      this.data.shopcarts.forEach((res) => {
        res.check = true;
      })
    }
    this.watchCekck(this.data.shopcarts)
  },
  delete(detail) {
    let item = detail.target.dataset.item;
    var id = this.data.shopcarts.findIndex((res) => {
      return res.propertyChildIds === item.propertyChildIds
    })
    this.data.shopcarts.splice(id, 1)
    let shopcarts = this.data.shopcarts
    this.watchCekck(shopcarts)
  },
  //购物车商品加减
  add(detail) {
    let item = detail.target.dataset.item;
    let a = 1;
    this.addorreduce(item.propertyChildIds, a)
  },
  reduce(detail) {
    let item = detail.target.dataset.item;
    let a = -1;
    this.addorreduce(item.propertyChildIds, a)
  },
  //数量增减
  addorreduce(id, a) {
    this.data.shopcarts.forEach((res) => {
      if (res.propertyChildIds === id) {
        res.value += a
        if (res.value === 0) {
          res.value = 1
        }
        if (res.value > 999) {
          res.value = 999
        }
      }
    })
    var shopcarts = this.data.shopcarts
    this.watchCekck(shopcarts)
  },
  //是否全选
  allCheck(){
    this.data.shopcarts.forEach((res) => {
      res.check = !res.check;
    })
    this.watchCekck(this.data.shopcarts)
  },
  //数量输入
  handleChange1({ detail }) {
    this.setData({
      value1: detail.value
    })
    this.Playsnum()
  },
  //将数量传给对应的商品并进行缓存
  Playsnum() {
    //判断id值
    this.data.shopcarts.forEach((res) => {
      if (res.id === this.data.shopid) {
        res.value = this.data.value1
      }
    })
    var shopcarts = this.data.shopcarts
    this.watchCekck(shopcarts)
  },
  //选中或者删除
  check(e){
    let id = e.currentTarget.id;
    this.data.shopcarts.forEach((res)=>{
      console.log(res.propertyChildIds === id)
      if (res.propertyChildIds === id){
        res.check = !res.check;
      }
    })
    //查看状态并进行改变并设置状态
    this.watchCekck(this.data.shopcarts)
  },
  //输入框
  bindKeyInput: function (e) {
    console.log(e)
  },
  play() {
    let url = "http://127.0.0.1:2000/MainSystem/Rest.aspx"
    let params = JSON.stringify({
      "id": 52,
      "method": "/MainSystem/Q3Frameworks/Rpcs/UserMessageRpc/Query",
      "params": [{
        "SelectColumns": ["ID", "UserMessageBody_Overview", "UserMessageBody_Time", "Read"],
        "SortExpression": "ID",
        "PageSize": this.count,
        "PageIndex": 0,
      }]
    })
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      }
    })
    // api.Post('',params).then((res)=>{
    // })
  },
  goshop() {//跳转
    wx.switchTab({
      url: '../classify/classify',//注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(999)
    // this.play()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //初始化弹框
    //获取缓存数据
    let _this = this
    wx.getStorage({
      key: 'shops',
      success(res) {
        let datas = res.data || [];
        console.log(datas)
        if (datas.length !== 0) {
          _this.setData({
            shopcarts:datas
          })
        }
      }
    })
  },
  //实时监测封装选中状态
  watchCekck: function (data) {
    //监测是否全选中
    let Index = data.findIndex((res) => {
      return res.check === false;
    })
    let allMoney = 0
    data.forEach((res) => {
      if (res.check === true) {
        let money = res.price * res.value
        allMoney += money
      }
    })
    let status = true;
    if (Index !== -1) {
      status = false;
    }
    //设置页面变动
    this.setData({
      checkStatus: status,
      shopcarts: data,
      allMoney: allMoney
    })
    //进行缓存
    wx.setStorage({
      key: 'shops',
      data: data
    })
    //全局购物车数量
    let text = String(data.length)
    app.getLength(text);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})