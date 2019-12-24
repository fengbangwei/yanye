// pages/clientManage/addClient/addClient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        ghf_mc: "",
        ghf_nsrsbh: "",
        ghf_sj: "",
        ghf_email: "",
        ghf_dzdh: "",
        ghf_yhzh: ""
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
      
  },
  addClient: function (options) {
    
  },
  doLogin: function (e) {
    var formObject = e.detail.value;
    var ghf_mc = formObject.ghf_mc;
    var ghf_nsrsbh = formObject.ghf_nsrsbh;
    var ghf_sj = formObject.ghf_sj;
    var ghf_email = formObject.ghf_email;
    var ghf_dzdh = formObject.ghf_dzdh;
    var ghf_yhzh = formObject.ghf_yhzh;
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/addnewCustomer",
      header: {
        'content-type': 'application/json',
        'username': 'admin'
      },
      method: 'POST',
      data: {
        ghf_mc: ghf_mc,
        ghf_nsrsbh: ghf_nsrsbh,
        ghf_sj: ghf_sj,
        ghf_email: ghf_email,
        ghf_dzdh: ghf_dzdh,
        ghf_yhzh: ghf_yhzh
      },
      success: function (data) {
        wx.showToast({
          title: data.data.returnmsg,
          icon: 'success',
          duration: 2000,
          success:function(){
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
  /**ghf_mc: function (e) {
    let ghf_mc = this.data
    this.setData({
      ghf_mc: e.detail.value
    })
    this.data.ghf_mc = e.detail.value;
    console.log(e.detail.value)
  },**/

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