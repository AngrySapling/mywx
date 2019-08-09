
//1.加入购物车
const addShopingcarts = (item,callback)=>{
  //获取缓存
  try {
    var value = wx.getStorageSync('shops') || [];
    if (value.length !== 0) {
      let isTrue = value.some(res => res.propertyChildIds === item.propertyChildIds);
        if(isTrue){
          value.forEach((res, index) => {
            console.log(res.propertyChildIds === item.propertyChildIds,"查看id是否相同")
            if (res.propertyChildIds === item.propertyChildIds) {
              res.value += item.value;
              if (res.value === 0) {
                res.value = 1
              }
              if (res.value > 999) {
                res.value = 999
              }
            }
          })
        }else {
          value.push(item)
        }
    }else{
      value.push(item)
    }
    //加入缓存
    wx.setStorage({
      key: "shops",
      data: value
    })
    let length = value.length;
    callback(length)
    
  } catch (e) {
    console.log(333)
    // Do something when catch error
  }
}

//2.
module.exports = { addShopingcarts }