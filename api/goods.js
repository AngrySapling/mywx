const apiUrl = "https://api.it120.cc/mzsx";
const api = require('./request.js');
//轮播
const recommend = `${apiUrl}/shop/goods/list`
const couponlist = `${apiUrl}/discounts/coupons`
const coupon = `${apiUrl}/discounts/fetch`

const indexs = {
  //轮播
  getRecommend(data, callback) {
    api({ url: recommend, method: "POST", data:data }).then((res) => {
      let data = res.data;
      callback(data)
    }).catch((err) => {
      showErr(err)
    })
  },

  //优惠券列表
  getCouponList(data, callback) {
    api({ url: couponlist,method:"POST", data: data }).then((res) => {
      let data = res.data;
      callback(data)
    }).catch((err) => {
      console.log(err, 777888999)
      showErr(err)
    })
  },
  //优惠券列表
  getCoupon(data, callback) {
    api({ url: coupon, data: data }).then((res) => {
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
