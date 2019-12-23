// pages/clientManage/clientManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowButton:false,
    inputValue:{},
    clientList:[
      {
        "id":"",
        "ghf_mc":"",
        "ghf_nsrsbh":"",
        "ghf_sj":"",
        "ghf_email":"",
        "ghf_dzdh":"",
        "ghf_yhzh":""
      },
    ]
  },
  backLeft: function () {
    wx.navigateBack({
      url: '../index/index',
    })
  },
  addClient: function(){
    wx.navigateTo({
      url: '../clientManage/addClient/addClient',
    })
  },
  bianji: function(event){
    console.log(event.currentTarget.dataset.bean.ghf_mc);
    wx.navigateTo({
      url: '../clientManage/addClient/bianji?ghf_mc=' + event.currentTarget.dataset.bean.ghf_mc + '&ghf_nsrsbh=' + event.currentTarget.dataset.bean.ghf_nsrsbh + '&ghf_dzdh=' + event.currentTarget.dataset.bean.ghf_dzdh + '&ghf_yhzh=' + event.currentTarget.dataset.bean.ghf_yhzh + '&id=' + event.currentTarget.dataset.bean.id+'',
    })
    
  },
  onBindFocus:function(event){
    
  },
  onBindBlur: function (event) {
    console.log(this)
  },
  bindinput: function(e){
    console.log(this)
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    console.log(name)
    this.inputValue[name] = e.detail && e.detail.value
    console.log(this.inputValue)
    this.setData(this.inputValue)
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
    let that = this;
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/findAllCustomerInfo",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'username': 'admin'
      },
      method: 'POST',
      success: function (data) {
        that.setData({
          clientList: data.data.infoList
        })
      }
    })
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