// pages/indent/indent.js

// "i-tabs": "../../dist/tabs/index",
//   "i-tab": "../../dist/tab/index",
//     "i-row": "../../dist/row/index",
//       "i-col": "../../dist/col/index",
//         "i-load-more": "../../dist/load-more/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
      name: "全部",
      id: "0"
    }, {
      name: "待付款",
      id: "1"
    }, {
      name: "待发货",
      id: "2"
      }, {
        name: "待收货",
        id: "3"
      }, {
        name: "待评价",
        id: "4"
      }],
    navID: '0',
  },
  // 点击导航
  playNav: function (e) {
    let id = e.currentTarget.id;
    this.setData({
      navID: id
    })
  },
  // handleChange({ detail }) {
  //   this.setData({
  //     current: detail.key
  //   });
  // },

  // handleChangeScroll({ detail }) {
  //   this.setData({
  //     current_scroll: detail.key
  //   });
  // },

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