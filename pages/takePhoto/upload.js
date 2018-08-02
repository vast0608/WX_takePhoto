// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    tempFilePath: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.path = options.path
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth
        var height = res.windowHeight
        var gap = 20
        that.setData({
          width:width,
          height:height,
          gap: gap
        })
        wx.getImageInfo({
          src: that.path,
          success: function(res){
            that.canvas = wx.createCanvasContext("image-canvas", that)
            //过渡页面中，图片的路径坐标和大小
            that.canvas.drawImage(that.path, 0, 0, that.data.width, that.data.height)
            wx.showLoading({
              title: '数据处理中',
              mask: true
            })
            that.canvas.setStrokeStyle('red')
            // 这里有一些很神奇的操作,总结就是MD拍出来的照片规格居然不是统一的
            //过渡页面中，对裁剪框的设定
            that.canvas.strokeRect(that.data.gap, that.data.gap, that.data.width - 2 * that.data.gap, 50)
            that.canvas.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({//裁剪对参数
                canvasId: "image-canvas",
                x: that.data.gap,//画布x轴起点
                y: that.data.gap,//画布y轴起点
                width: that.data.width - 2 * that.data.gap,//画布宽度
                height: 50,//画布高度
                destWidth: that.data.width - 2 * that.data.gap,//输出图片宽度
                destHeight: 50,//输出图片高度
                canvasId: 'image-canvas',
                success: function (res) {
                  that.filePath = res.tempFilePath
                  //清除画布上在该矩形区域内的内容。
                  that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                  that.canvas.drawImage(that.filePath, that.data.gap, that.data.gap, that.data.width - that.data.gap*2, 50)
                  that.canvas.draw()
                  wx.hideLoading()
                  //在此可进行网络请求
                  
                },
                fail:function(e){
                  wx.hideLoading()
                  wx.showToast({
                    title: '出错啦...',
                    icon: 'loading'
                  })
                }
              });
            }, 1000);
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})