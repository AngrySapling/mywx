// pages/bluetooth/bluebooth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toastTitle:'',
    deviceIdList:[],
    deviceId:null
  },
  playBluetooth(){
    let _this = this;
    //调用蓝牙
    wx.openBluetoothAdapter({
      success: function(res) {
        setTimeout(() => {
          _this.getBluetoothAdapterState()
        }, 1000)
      },
      fail: function (res) {//如果手机上的蓝牙没有打开，可以提醒用户
        wx.showToast({
          title: '请开启蓝牙',
          icon: 'fails',
          duration: 1000
        })
      }
    })
  },
  //检查蓝牙可用
  getBluetoothAdapterState() {
    var _this = this;
    this.setData({
      toastTitle: '检查蓝牙状态'
    })
    wx.getBluetoothAdapterState({
      success: function (res) {
        _this.startBluetoothDevicesDiscovery()
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //搜索蓝牙设备
  startBluetoothDevicesDiscovery() {
    var _this = this;
    setTimeout(() => {
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          /* 获取蓝牙设备列表 */
          _this.getBluetoothDevices()
        },
        fail(res) {
        }
      })
    }, 1000)
  },
  //获取蓝牙列表
  getBluetoothDevices() {
    var _this = this;
    setTimeout(() => {
      wx.getBluetoothDevices({
        services: [],
        allowDuplicatesKey: false,
        interval: 0,
        success: function (res) {
          if (res.devices.length > 0) {
            if (JSON.stringify(res.devices).indexOf(_this.deviceName) !== -1) {
              for (let i = 0; i < res.devices.length; i++) {
                if (_this.deviceName === res.devices[i].name) {
                  /* 根据指定的蓝牙设备名称匹配到deviceId */
                  _this.setData({
                    deviceId: res.devices[i].deviceId
                  })
                  setTimeout(() => {
                    _this.connectTO();
                  }, 2000);
                };
              };
            } else {
              res.devices.forEach((res1)=>{
                _this.setData({
                  deviceIdList: res1.deviceId
                })
              })
              
            }
          } else {
          }
        },
        fail(res) {
          console.log(res, '获取蓝牙设备列表失败=====')
        }
      })
    }, 2000)
  },
  //连接蓝牙
  connectTO() {
    let _this = this
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        that.connectedDeviceId = deviceId;
        /* 4.获取连接设备的service服务 */
        that.getBLEDeviceServices();
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res, '停止搜索')
          },
          fail(res) {
          }
        })
      },
      fail: function (res) {
      }
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