Page({
  data: {
    message:'第1条明细中支持的税率列表:[0,0.015,0.03,0.04,0.05,0.06,0.09,0.10,0.11,0.13,0.16,0.17]'
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      message: options.message
    })
  },
  backLeft(){
    wx.navigateBack();
  },
  onShow: function () {

  }
})