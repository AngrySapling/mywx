// pages/detail/detail.js
const api = require("../../utils/api.js")
const WxParse = require('../../wxParse/wxParse.js');

// "i-rate": "../../dist/rate/index",
  // "i-action-sheet": "../../dist/action-sheet/index",
    // "i-input-number": "../../dist/input-number/index",
      // "i-toast": "../../dist/toast/index",
        // "i-badge": "../../dist/badge/index"
// const { $Toast } = require('../../dist/base/index');
var app = getApp()
Page({
  //分享
  
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    detail_imgUrls:[],//图片
    content:"",//产品的图文详情
    basicInfo:{},//商品信息
    category:{},//商品分类
    properties:[],//商品规格
    addGoods:"",//加入购物车
    value1: 1,//输入的数量
    specid:0,
    specname:"",
    goodPrice:0,//价格
    isCollect:false,
    show:false,
    show1:false,
    length:0,
// 时间
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
    
  },
  //关闭弹框
  onClose(){
    this.setData({
      show:false,
      show1:false
    })
  },
  //时间选择
  onChange(event) {
    console.log(event)
    this.setData({
      currentDate: event.detail,
      show1:false
    });
    console.log(this.data.currentDate)
  },
  //规格选择
  spec:function(e){
    let id = e.target.id;
    (e,654)
    let propertyChildIds = e.target.dataset.id
    let specname = e.target.dataset.name
    this.setData({
      specid: propertyChildIds,
      specname: specname
    })
    this.getPrice(id, propertyChildIds)
  },
  //加入购物车
  addGoodsDetail(){
    let _this = this
    if (this.data.value1.value1 > 999) {
      this.detail.value1 = 999
    }
    var methods = require("../../utils/method.js")
    let datas ={
      pic: this.data.basicInfo.pic,
      name:this.data.basicInfo.name,
      value: this.data.value1,
      specname:this.data.specname,
      id: this.data.basicInfo.id,
      propertyChildIds: this.data.propertyChildIds,
      price: this.data.goodPrice,
      check:true,
    }
    methods.addShopingcarts(datas, function (length) {
      console.log(length,"length")
      app.getLength(String(length))
      _this.setData({
        show: false,
        length:length
      })
    })
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
  addShopCarts(e){
    let name = e.target.id;
    let shopid = e.target.dataset.id;
    let specid = e.target.dataset.specid;
    let specname = e.target.dataset.specname;
    this.getPrice(shopid,specid);
    this.setData({
      show: true,
      addGoods:name,
      specid:specid,
      specname: specname
    })
  },
  handleChange1({ detail }) {
    this.setData({
      show1: true,
    })
  },
  handleChange(event) {
    this.setData({
      current: event.detail.index
    });
  },
  //获取详情
  getDetail:function(id){
    let _this  = this
    api.Post("/shop/goods/detail?id="+id).then((res)=>{
      let data = res.data.data
      this.setData({
        detail_imgUrls:data.pics,
        content:data.content,
        category: data.category,
        basicInfo: data.basicInfo,
        properties: data.properties[0].childsCurGoods
      })
      WxParse.wxParse('data', 'html', data.content, _this, 0);
    })
  },
  //获取评价
  getReputation:function(id){
    api.Post("/shop/goods/reputation", {goodsId:id}).then((res)=>{
      if(res.data.code === 700){

      }
    })
  },
  //获取价格
  getPrice: function (id, propertyChildIds){
    var token = wx.getStorageSync("token")
    api.Post("/shop/goods/price", { goodsId: id, propertyChildIds: propertyChildIds}).then((res)=>{
      let data = res.data.data
      this.setData({
        goodPrice: data.price,
        propertyChildIds: data.propertyChildIds
      })
    })
  },
  //检测收藏
  isCollect:function(id){
    var token = wx.getStorageSync("token")
    api.Get("/shop/goods/fav/check?goodsId="+String(id)+"&token="+token).then((res)=>{
      if(res.data.code === -1){
        this.setData({
          isCollect:false
        })
      }else{
        this.setData({
          isCollect: true
        })
      }
      
    })
  },
  //添加收藏
  addCollect:function(e){
    let id = e.currentTarget.id
    let token = wx.getStorageSync("token")
    if(this.data.isCollect){
      api.Post("/shop/goods/fav/delete", {goodsId:String(id),token:token}).then((res)=>{
        this.setData({
          isCollect: false
        })
      })
    }else{
      api.Post("/shop/goods/fav/add", {goodsId:id,token:token}).then((res) => {
        let data = res.data
        if (data.msg === "success") {
          this.setData({
            isCollect: true
          })
        }
      })
    }
    
    
  },
  //删除收藏
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    (options)
    let optionss = {
      id:"113909"
    }
    this.getDetail(optionss.id)
    this.getReputation(optionss.id)
    this.getLength();
  },
  
  // onShareAppMessage: (res) => {
  //   console.log(res,365464)
  //   if (res.from === 'button') {
  //     console.log("来自页面内转发按钮");
  //     console.log(res.target);
  //   }
  //   else {
  //     console.log("来自右上角转发菜单")
  //   }
  //   return {
  //     title: '妹子图片',
  //     path: '/pages/detail/detail?id=113909',
  //     // imageUrl: "/images/1.jpg",
  //     success: (res) => {
  //       console.log("转发成功", res);
  //     },
  //     fail: (res) => {
  //       console.log("转发失败", res);
  //     }
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
      path: 'pages/indexs/indexs',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
})