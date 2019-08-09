
// pages/indexs/indexs.js
const indexs = require('../../api/index.js');
const goods = require('../../api/goods.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    Coupon:[],
    Recommend:[],
    Page:0,
    la1: 0,
    lo2: 0,
    scale: 28,//
    swiperCurrent:0,//轮播banner样式变更index
    nav:[{
      name:"收藏",
      url:"/pages/collect/collect",
      src:"../../static/image/collect.png",

    },{
      name: "数据",
      url: "/pages/record/record",
      src: "../../static/image/data.png",

    },{
      name: "发票",
      url: "/pages/invoice/invoice",
      src: "../../static/image/invoice.png",

      }, {
        name: "蓝牙",
        url: "/pages/bluetooth/bluetooth",
        src: "../../static/image/invoice.png",

      }],
    s:0,
    message:[],//消息
  },
  //轮播绑定事件
  swiperchange:function(e){
    let index = e.detail.current;
    this.setData({
      swiperCurrent:index
    })
  },
  //打电话
  phone:function(e){
    wx.makePhoneCall({
      phoneNumber: '17635798369' //仅为示例，并非真实的电话号码
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserLocation()
    // wx.getFileInfo({
    //   success(res) {
    //     console.log(res.size)
    //     console.log(res.digest)
    //   }
    // })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //   }
    // })
    // let params = JSON.stringify({
    //   "id": 52,
    //   "method": "/MainSystem/Q3Frameworks/Rpcs/UserMessageRpc/Query",
    //   "params": [{
    //     "SelectColumns": ["ID", "UserMessageBody_Overview", "UserMessageBody_Time"],
    //     "SortExpression": "ID",
    //     "PageSize": 100,
    //     "PageIndex": 0,
    //     "Conditions": { "Read": "false" },
    //   }]
    // })
    // api.Post('',params).then((res)=>{
    //   console.log(res)
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  //获取轮播
  getBanner:function(){
    //获取轮播
    let _this = this;
    indexs.getBanner({},(msg)=>{
      this.setData({
        imgUrls: msg
      })
    });
  },
  //获取优惠券
  getCouponList: function () {
    //获取优惠券
    let _this = this;
    indexs.getCouponList({ type: "001" }, (msg) => {
      console.log(msg,666)
      this.setData({
        Coupon:msg[0]
      })
    })
  },
  //领取优惠券
  getCoupon: function (e) {
    console.log(e,5555555555555555)
    let ID = e.currentTarget.dataset.id;
    //获取优惠券
    let _this = this;
    let token = wx.getStorageSync('token')
    indexs.getCoupon({ id: ID, token: token }, (msg) => {
      console.log(msg, 65566)
      if(msg.code === 0){
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: msg.msg,
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  //精品推荐
  getRecommend(){
    //获取优惠券
    let _this = this;
    goods.getRecommend({ recommendStatus: 1, page: this.data.Page, pageSize:10 }, (msg) => {
      console.log(msg, 666)
      this.setData({
        Recommend: msg
      })
    })
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  //消息通知
  getMessage:function(){
    let token = wx.getStorageSync("token")
    let _this = this;
    indexs.Post("/notice/list",{page:"0",pageSize:"10",token:token}).then((res)=>{
      if(res.data.code !== 404){
        let data = res.data.data.dataList;
        data.forEach((res)=>{
          res.dateAdd = res.dateAdd.split(" ")[0]
        })
        console.log(data)
       
        _this.setData({
          message: data
        })
      }
      
    })
  },
  //点击消息跳转
  nav:function(e){
    console.log(e)
    let id = e.currentTarget.id

    wx.navigateTo({
      url: '../messageDetail/messageDetail?id='+id
    })
  },
  onShow: function () {
    //监听购物车的商品数量
    let value = wx.getStorageSync('shops')
    app.getLength(String(value.length))
    //获取轮播
    this.getBanner();
    //获取优惠券列表
    this.getCouponList();
    //获取推荐
    this.getRecommend()
    // this.getMessage();
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
    console.log('假爱')
    var that = this
    wx.showNavigationBarLoading()
    that.onLoad()
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },2000)

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


  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined 表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false 表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true 表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的indexs
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的indexs
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 获取用户的当前位置
  getLocation: function () {
    let that = this;
    wx.getLocation({

      type: 'wgs84',
      success: function (res) {
        console.log(res, '这个位置1')
        var la1 = res.latitude
        var lo2 = res.longitude
        that.setData({
          la1: la1,
          lo2: lo2,
          scale: 28
        })
        that.getShangjia(la1, lo2);
      }
    })
  },
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;
    console.log("计算结果", s)
    this.setData({
      s: s
    })
  },
  //商家
  getShangjia: function (la1, lo2) {
    var that = this;
    // app.util.request({
    //   'url': 'entry/wxapp/Shangjia',
    //   success: function (res) {
    //     console.log(res.data.data);
    //     var shangjia = res.data.data
    //     for (var i = 0; i < shangjia.length; i++) {
    that.distance(la1, lo2, 39.885, 116.36500)//shangjia[i].s_latitude, shangjia[i].s_longitude
    //   shangjia[i].s_shopjuli = that.data.s;
    // }
    // that.setData({
    //   shangjia: res.data.data
    // })

    // },
    // fail: function (err) {
    //   console.log(err)
    // },
    // });
  },
})