// "i-action-sheet": "../../dist/action-sheet/index"
// const { $Toast } = require('../../dist/base/index');
// const { $Message } = require('../../dist/base/index');
const api = require("../../utils/api.js");
const goods = require("../../api/goods.js");
const request = require("../../utils/request.js")
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: false, //弹窗闭合打开
        scrolltop_h: 51,
        nav_h: 51, //分类栏超出内容点击跳转高度设置
        tabID: 0, //点击分类栏变色ID
        page: 1, //页面
        pageSize: 8, //每页个数
        isLoading: false, //是否显示底部提示
        isShow: false, //是否显示无商品图画
        loading: true, //是否进行加载
        navList: [],
        shop_list: [],
        //商品分类详情
        basicInfo: {},
        properties: [],
        specGoods: [],

    },
    //弹出加入购物车
    addshop: function(e) {
        this.setData({
            show: true,
            specGoods: []
        })
        this.getDetail("113909")
    },
    //关闭弹框
    onClose() {
        this.setData({ show: false });
    },
    //获取详情
    getDetail: function(id) {
        let _this = this
        api.Post("/shop/goods/detail?id=" + id).then((res) => {
            let data = res.data.data
            let properties = data.properties[0].childsCurGoods;
            this.setData({
                basicInfo: data.basicInfo,
                properties: properties,
            })
            console.log(data)
            properties.forEach((result) => {
                _this.getPrice(id, result.id, result.name)
            })
        })
    },
    //获取价格
    getPrice: function(id, specid, name) {
        var token = wx.getStorageSync("token")
        api.Post("/shop/goods/price", { goodsId: id, propertyChildIds: specid }).then((res) => {
            let data = res.data.data
            data.name = name;
            console.log(data, "价格")
            this.data.specGoods.push(data)
            this.setData({
                specGoods: this.data.specGoods
            })
        })
    },
    //点击nv栏
    navclick: function(e) {
        this.data.page = 1;
        this.setData({
            shop_list: [],
            isShow: false,
            isLoading: false,
            loading: true
        })
        console.log(222)
        wx.showLoading({ title: '加载中', })
        this.data.navList.forEach((res, index) => {
            if (res.id === e.target.dataset.id) {
                this.shopList(res.id)
                this.setData({
                    scrolltop_h: index * this.data.nav_h - 2 * this.data.nav_h,
                    tabID: res.id
                })
            }
        })
    },
    //商品列表
    shopList: function(id) {
        console.log(8885522)
        let _this = this;
      let params = { 
        categoryId: id, 
        page: this.data.page, 
        pageSize: this.data.pageSize,
        kanjia:false,
        miaosha:false, 
      }
      goods.getGoods(params, (msg) => {
            wx.hideLoading()
            if (!msg || msg.length < _this.data.pageSize) {
                _this.setData({
                    isLoading: false
                })
            } else {
                _this.setData({
                    loading: true,
                })
            }
            let data = _this.data.shop_list;
            if (msg) {
                data = data.concat(msg)
                _this.setData({
                    shop_list: data
                });
            }
            if (!data.length) {
                console.log('哈哈')
                _this.setData({
                    isShow: true,
                })
            }
        })
    },
    //搜索
    search: function(e) {
        console.log(e.detail) //组件中的输入
    },
    //提示框
    toast: function() {

    },
    //获取类
    getNavList: function() {
        let _this = this;
        goods.getNav({}, (msg) => {
            _this.setData({
                navList: msg,
                tabID: msg[0].id
            })
            console.log(333)
            _this.shopList(msg[0].id)
        })
    },
    //滑到底部
    lower: function(e) {
        if (this.data.loading) { //加载更多
            this.setData({
                loading: false,
                isLoading: true
            })
            this.data.page++;
            console.log(9999)
            this.shopList(this.data.tabID)
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getNavList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    //显示购物车数量
    getLength: function() {
        let value = wx.getStorageSync('shops');
        app.getLength(String(value.length));
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getLength()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})