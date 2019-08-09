// pages/sales/sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sales_list:[
      {
        id: 0,
        name: '阿萨大',
        guige: 200 * 300
      },
      {
        id: 1,
        name: '安德森',
        guige: 300 * 600
      },
      {
        id: 1,
        name: '安德森',
        guige: 300 * 600
      },
      {
        id: 1,
        name: '安德森',
        guige: 300 * 600
      },
      {
        id: 1,
        name: '安德森',
        guige: 300 * 600
      },
    ]
  },
  //检索
  //搜索
  search: function (e) {
    console.log(e.detail)//组件中的输入
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