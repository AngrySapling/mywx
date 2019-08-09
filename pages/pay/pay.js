// pages/shopingcarts/shopingcarts.js
const api = require('../../utils/api.js');
import Dialog from '../../dist/dialog/dialog';
// "i-action-sheet": "../../dist/action-sheet/index",
var app = getApp()
Page({
  data: {
    show: false,
    active: 0,
    actions: [
      {
        name: '微信支付'
      },{
        name:'农行支付'
      }
    ],
  },
  surePay:function(){
    Dialog.confirm({
      title: '提示',
      message: '确认支付'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  handleOpen1:function(){//选择支付方式
    this.setData({
      show:true
    })
  },
  onClose() {//关闭
    this.setData({ show: false });
  },

  onSelect(event) {//选择
    console.log(event.detail);
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
    //初始化弹框
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