// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    gap:0,
    hasTakePhoto: false,
    src: "",
    logo: "../../assets/imgs/takephoto.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.ctx = wx.createCameraContext()
    // that.canvas = wx.createCanvasContext("image-canvas", this);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
          gap: 20
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 拍照
   */
  takePhoto: function() {
    var that = this
    that.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.setStorage({
          key: 'originalImagePath',
          data: res.tempImagePath,
        })
        wx.navigateTo({
          url: 'upload?path=' + res.tempImagePath + '&char=0'
        })
      }
    })
  }


    

})