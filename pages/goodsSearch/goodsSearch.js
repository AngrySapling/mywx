// pages/goodsSearch/goodsSearch.js
const request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[{name:"综合",id:'0'},{name:"最热",id:'1'},{name:"新品",id:'2'}],
    searchGoods:[],
    loading:true,
    isLoading:false,
    isShow:false,
    page:1,
    pageSize:10,
    isNavId:'0',
    priceUpDown:false
  },
  //弹出加入购物车
  addshop: function (e) {
    this.setData({
      show: true,
      specGoods: []
    })
    this.getDetail("113909")
  },
  //点击导航
  navLi:function(e){
    console.log(e)
    let id = e.currentTarget.id;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    this.setData({
      isNavId:id
    })
  },
  //点击价格
  navLi1: function (e) {
    console.log(e)
    let id = e.currentTarget.id;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    this.setData({
      isNavId: id,
      priceUpDown:!this.data.priceUpDown
    })

  },
  shopList: function (id) {
    let _this = this
    request.getSearchList(id,this.data.page, this.data.pageSize, function (res) {
      wx.hideLoading()
      console.log(res, 666)
      if (res.data.code !== 700) {
        let data = res.data.data;
        _this.setData({
          searchGoods: data
        })
      } else {
        _this.setData({
          isShow: true,
        })
      }
    })
  },
  //关闭弹框
  onClose() {
    this.setData({ show: false });
  },
  //滑到底部
  lower: function (e) {
    console.log("滑动到底部")
    if (!this.data.loading === false) {//加载更多
      this.setData({
        loading: false,
        isLoading: true
      })
      this.data.page++;
      let _this = this;
      request.getSearchList('',this.data.page, this.data.pageSize, function (res) {
        console.log(res,"isLoading")
        _this.setData({
          isLoading: false
        })
        if (res.data.code !== 700) {
          var data = res.data.data
          if (data.length = _this.data.pageSize) {
            _this.setData({
              loading: true
            })
          }
          let data = res.data.data;
          var data1 = _this.data.shop_list.concat(data)
          _this.setData({
            shop_list: data1
          })
        } else {
          //这里显示出错信息
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shopList("")
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

  },
  scroll: function (e) {
   let scrollTop = e.detail.scrollTop;
   if(scrollTop >= 50){
      this.setData({
        isShow:true
      })
   }else{
     this.setData({
       isShow: false
     })
   }
  }
})