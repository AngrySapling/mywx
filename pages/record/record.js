// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record_list:[{
      id:1,
      src:'../../static/image/vip.png',
      name:'会员发展情况分析'
    },{
      id: 2,
        src: '../../static/image/stock.png',
      name:'库存查询'
    },{
      id: 3,
        src: '../../static/image/task.png',
      name: '任务完成分析'
    },{
      id: 4,
        src: '../../static/image/sales.png',
      name: '销售额排名'
    }, {
      id: 5,
        src: '../../static/image/salesratio.png',
      name: '销售同比分析'
    }]
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