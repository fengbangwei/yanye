// pages/clientManage/addClient/addClient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  backLeft: function () {
    wx.navigateBack({
      url: '../clientManage/clientManage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ghf_mc: options.ghf_mc,
      ghf_nsrsbh: options.ghf_nsrsbh,
      ghf_dzdh: options.ghf_dzdh,
      ghf_yhzh: options.ghf_yhzh,
      id: options.id
    })
    console.log(options)
  },
  delete:function(e){
     wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/deleteCustomerInfoByid",
      header: {
        'content-type': 'application/json',
        'username': 'admin'
      },
      method: 'POST',
      data: {
        username: 'admin',
        id: e.currentTarget.dataset.userid
      },
      success: function (data) {
        wx.showToast({
          title: data.data.returnmsg,
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                url: '../clientManage/clientManage',
              })
            }, 2000)
          }
        })
      }
    })
  },
  doLogin:function (e){
    var formObject = e.detail.value;
    var ghf_mc = formObject.ghf_mc;
    var ghf_nsrsbh = formObject.ghf_nsrsbh;
    var ghf_sj = formObject.ghf_sj;
    var ghf_email = formObject.ghf_email;
    var ghf_dzdh = formObject.ghf_dzdh;
    var ghf_yhzh = formObject.ghf_yhzh;
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/updateCustomerByid",
      header: {
        'content-type': 'application/json',
        'username': 'admin'
      },
      method: 'POST',
      data: {
        ghf_mc: ghf_mc,
        ghf_nsrsbh: ghf_nsrsbh,
        ghf_dzdh: ghf_dzdh,
        ghf_yhzh: ghf_yhzh,
        ghf_sj: ghf_sj,
        ghf_email: ghf_email,
        id: formObject.id
      },
      success: function (data) {
        wx.showToast({
          title: data.data.returnmsg,
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                url: '../clientManage/clientManage',
              })
            }, 2000)
          }
        })
      }
    })
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