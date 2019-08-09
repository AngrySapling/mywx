// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[{
      name:"未使用",
      id:"0"
    },{
      name:"已使用",
      id:"1"
    },{
      name:"已过期",
      id:"2"
    }],
    navID:'0',
  },
  // 点击导航
  playNav:function(e){
    let id = e.currentTarget.id;
    this.setData({
      navID:id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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