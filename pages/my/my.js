// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myindentList:[{
      img:'../../static/image/pay.png',
      id:1,
      name:'未审核'
    },{
      img: '../../static/image/wait.png',
      id: 2,
      name: '已审核'
    }, {
      img: '../../static/image/song.png',
      id: 3,
        name: '已出库'
    }, {
      img: '../../static/image/shou.png',
      id: 4,
        name: '已验收'
    }]
  },
  // 添加地址
  addAddress:function(){
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
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