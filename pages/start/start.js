// pages/start/start.js
var api = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    animationData: {},
    animation:"",
    isShow:true,
  },
  goshop(){
    wx.switchTab({
      url: '../indexs/indexs',//注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onGotUserInfo(e) {
    this.setData({
      isShow:false,
      userInfo: e.detail.userInfo
    })
    this.opacity();
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })
  },
  //动画
  opacity: function () {
    this.animation.opacity(1).step()
    this.setData({ animation: this.animation.export() })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      api.Post("/user/check-token",{token:token}).then((res)=>{
        if (res.data.code != 0) {
          wx.removeStorageSync('token')
          that.login();
        } else {
          // 回到原来的地方放
          wx.navigateBack();
        }
      })
      return;
    }
    wx.login({
      success(res){
        console.log(res.code,"code")
        let url = "http://127.0.0.1:2000/MainSystem/Rest.aspx"
        let params = JSON.stringify({
          "id": 52,
          "method": "/MainSystem/Q3Frameworks/Rpcs/UserMessageRpc/Query",
          "params": [{
            "SelectColumns": ["ID", "UserMessageBody_Overview", "UserMessageBody_Time", "Read"],
            "SortExpression": "ID",
            "PageSize": 10,
            "PageIndex": 0,
          }]
        })
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          data: params,
          method: 'POST',
          header: {
            'content-type': 'application/json', 'cookie': wx.getStorageSync('EasyAuth') // 默认值
          },
          success: function (res) {
            console.log(res,"登录状态")
          }
        })
        // api.Post('/user/wxapp/login',{code:res.code}).then((res1)=>{
        //   if (res1.data.code == 10000) {
        //     // 去注册
        //     that.registerUser();
        //     return;
        //   }
        //   else if (res1.data.code != 0) {
        //     // 登录错误
        //     wx.hideLoading();
        //     wx.showModal({
        //       title: '提示',
        //       content: '无法登录，请重试',
        //       showCancel: false
        //     })
        //     return;
        //   }
        //   wx.setStorageSync('token', res1.data.data.token)
        //   wx.setStorageSync('uid', res1.data.data.uid)
        // })
      }
    })
    //进行动画
    
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            api.Post("/user/wxapp/register/complex",{code:code,encryptedData:encryptedData,iv:iv}).then((res)=>{
              wx.hideLoading();
              that.login();
            })
          }
        })
      }
    })
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
