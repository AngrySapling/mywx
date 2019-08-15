const apiUrl = "https://api.it120.cc/mzsx";
const api = require('./request.js');
//轮播
const banner = `${apiUrl}/banner/list`
//优惠券列表
const couponlist = `${apiUrl}/discounts/coupons`
//优惠券获取
const coupon = `${apiUrl}/discounts/fetch`
//消息
const message = `${apiUrl}/notice/list`

const indexs = {
  //轮播
  getBanner(data,callback){
    api({url:banner,data}).then((res)=>{
      let data = res.data;
      callback(data)
    }).catch((err)=>{
      showErr(err)
    })
  },

  //优惠券列表
  getCouponList(data,callback){
    api({ url: couponlist, method: "POST",data:data}).then((res)=>{
      let data = res.data;
      callback(data)
    }).catch((err)=>{
      console.log(err,777888999)
      showErr(err)
    })
  },
  //优惠券列表
  getCoupon(data, callback) {
    api({ url: coupon, method: "POST", data: data }).then((res) => {
      let data
      if(res.data){
       data = res.data;
      }else{
        showErr(res)
      }
      callback(data)
    }).catch((err) => {
      showErr(err)
    })
  },
  //消息列表
  getMessage(data, callback) {
    api({ url: message, method: "POST", data: data }).then((res) => {
      let data
      if (res.data) {
        data = res.data;
      } else {
        showErr(res)
      }
      callback(data)
    }).catch((err) => {
      showErr(err)
    })
  }
  
}

function showErr(err) {
  wx.showModal({
    showCancel: false,
    content: err.msg
  });
}
module.exports = indexs;
