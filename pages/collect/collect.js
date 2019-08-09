// pages/collect/collect.js
// const { $Toast } = require('../../dist/base/index');
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    none:false,
    isShow:false,
    value:'',//输入框值
    show: false,//是否显示弹框
    collect_list: [
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
        id: 2,
        name: '安德森',
        guige: 300 * 600
      },
      {
        id: 3,
        name: '安德森',
        guige: 300 * 600
      },
      {
        id: 4,
        name: '安德森',
        guige: 300 * 600
      },
    ]
  },
  toast: function () {
    
  },
  //商品列表
  getShopList: function (id, callback) {
    api.Post("/shop/goods/list", {
      categoryId: id,
      page: this.data.page,
      pageSize: this.data.pageSize
    }).then((res) => {
      callback(res)
    })
  },
  //搜索
  onSearch:function(){
    console.log('asdasd' )
  },
  //弹出加入购物车
  addShop:function(){
    this.setData({
      show:true
    })
  },
  //关闭弹出框
  close:function(){
    this.setData({
      show:false
    })
  },
  //首次获取商品
  shopList: function (id) {
    let _this = this
    this.getShopList(id, function (res) {
      if (res.data.code !== 404) {
        let data = res.data.data;
        if (data.length < _this.data.pageSize) {
          this.setData({
            loading: false,
            none: true
          })
        }
        data.forEach((res) => {
          res.star = 3
        })
        _this.setData({
          collect_list: data
        })
      } else {
        _this.setData({
          loading: false,
          none: false,
          isShow: true,
        })
      }
    })
  },
  //滑到底部
  lower: function (e) {
    if (!this.data.loading === false) {//加载更多
      this.setData({
        loading: false
      })
      this.data.page++;
      let _this = this;
      this.getShopList(this.data.tabID, function (res) {
        if (res.data.code !== 404) {
          var data = res.data.data
          if (data.length < _this.data.pageSize) {
            _this.setData({
              none: true
            })
          } else {
            _this.setData({
              loading: true
            })
          }
          let data = res.data.data;
          var data1 = _this.data.shop_list.concat(data)
          data.forEach((res) => {
            res.star = 3
          })
          _this.setData({
            collect_list: data1
          })
        } else {
          _this.setData({
            none: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.shopList()
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