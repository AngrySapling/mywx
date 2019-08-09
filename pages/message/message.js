// pages/message/message.js
const api = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_list:[],
    page:0,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取消息信息
  getMessage:function(){
    let token = wx.getStorageSync("token")
    let _this = this;
    api.Post("/notice/list", { page: "0", pageSize: "10", token: token }).then((res) => {
      if (res.data.code !== 404) {
        console.log(res)
        let data = res.data.data.dataList
        _this.setData({
          message_list: data
        })
      }

    })
  },
  onLoad: function (options) {

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
    this.getMessage();
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