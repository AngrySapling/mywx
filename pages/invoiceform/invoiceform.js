// pages/invoiceform/invoiceform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceNav:[
      {"id":0,"name":"个人",},
      {"id":1,"name":"事业单位"},
      {"id":2,"name":"企业"}
    ],
    navID:0,
    items: [
      { name: 'person', value: '个人' ,checked: 'true'},
      { name: 'institution', value: '事业单位', },
      { name: 'company', value: '企业' },
    ]
  },
  //选择选项
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //点击导航
  navtap(detail){
    let id = Number(detail.target.id)
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