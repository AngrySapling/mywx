// pages/invoice/invoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getInvoice:[
      {"id":1,"name":"手机号申请"},
      {"id":2,"name":"小票号申请"}
    ],
    classID:1,
    value:'',
  },
  btnsearch(){
    console.log(this.data.value)
  },
  bindKeyInput(e){
    this.setData({
      value:e.detail.value
    })
  },
  //点击切换发票申请
  palyInvoice(detail){
    let id = detail.target.id
    this.setData({
      classID:id
    })
  },
  //调用相机
  photo(){
    let _this = this
    wx.scanCode({
      success(res) {
        console.log(res,999)
        let scanType = res.scanType
        if (scanType === "CODE_128"){
          _this.setData({
            value: res.result
          })
        }else{
          console.log(scanType,"打发士大夫")
          console.log("请扫描指定条形码")
        }
       
      }
    })
  },
  //跳转到开票页面
  navInvoice(){
    wx.navigateTo({
      url: '../invoiceform/invoiceform'
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