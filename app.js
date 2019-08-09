
//app.js
App({
  //data数据
  data:{
    shoplength:"1"
  },
  
  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onLaunch: function () {
    wx.getStorage({
      key: 'shops',
      success(res) {
        let text = String(res.data.length)
        console.log(text)
        if(text === "0"){
          wx.hideTabBarRedDot({
            index:3
          })
          return;
        }
        wx.setTabBarBadge({
          index: 3,
          text: text
        })
      }
    })
  },
  //  当小程序从前台进入后台，会触发 onHide

  onHide: function () {

  },
  globalData: {
    shoplength:"1"
  },
  //购物车徽章图标
  getLength: function (text) {
    const Stingtext = String(text)
    if(Stingtext === "0"){
      wx.hideTabBarRedDot({
        index: 3
      })
      return;
    }
    wx.setTabBarBadge({
      index: 3,
      text: Stingtext
    })
  },
  sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString, emphasis_keyword) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'), //登录接口返回的登录凭证
        type: 0, //0 小程序 1 服务号
        module: 'order', //所属模块：immediately 立即发送模板消息；order 所属订单模块
        business_id: orderId, //登录接口返回的登录凭证
        trigger: trigger, //module不为immediately时必填，代表对应的【订单】触发的状态
        template_id: template_id, //模板消息ID
        form_id: form_id, //type=0时必填，表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
        url: page, //小程序：点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）；服务号：跳转的网页地址
        postJsonString: postJsonString, //模板消息内容
        emphasis_keyword: emphasis_keyword //小程序："keyword1.DATA" 模板需要放大的关键词，不填则默认无放大
      },
      success: (res) => {
        //console.log(res.data);
      }
    })
  },
})