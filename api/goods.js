const apiUrl = "https://api.it120.cc/mzsx";
const api = require('./request.js');
//精品推荐
const goods = `${apiUrl}/shop/goods/list`
//导航列表
const navs = `${apiUrl}/shop/goods/category/all`


const indexs = {
  //轮播
  getGoods(data, callback) {
    api({ url: goods, method: "POST", data:data }).then((res) => {
      let data = res.data;
      callback(data)
    }).catch((err) => {
      showErr(err)
    })
  },

  //导航列表
  getNav(data, callback) {
    api({ url: navs,method:"POST", data: data }).then((res) => {
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
