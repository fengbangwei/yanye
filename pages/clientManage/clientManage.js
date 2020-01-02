const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowButton: false,
    info: "",
    inputValue: {},
    clientList: [{
      "id": "",
      "ghf_mc": "",
      "ghf_nsrsbh": "",
      "ghf_sj": "",
      "ghf_email": "",
      "ghf_dzdh": "",
      "ghf_yhzh": ""
    }],
    openInvoice:false
  },
  backLeft: function() {
    wx.navigateBack({
      url: '../index/index',
    })
  },
  addClient: function() {
    wx.navigateTo({
      url: '../clientManage/addClient/addClient',
    })
  },
  inputedit: function(e) {
    console.log(e)
    let that = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    console.log(value)
    let name = dataset.name;
    console.log(name)
    that.data[name] = value;
    that.setData({
      info: that.data[name]
    })
  },
  bianji: function(event) {
    console.log(event.currentTarget.dataset.bean.ghf_mc);
    wx.navigateTo({
      url: '../clientManage/addClient/bianji?ghf_mc=' + event.currentTarget.dataset.bean.ghf_mc + '&ghf_nsrsbh=' + event.currentTarget.dataset.bean.ghf_nsrsbh + '&ghf_dzdh=' + event.currentTarget.dataset.bean.ghf_dzdh + '&ghf_yhzh=' + event.currentTarget.dataset.bean.ghf_yhzh + '&id=' + event.currentTarget.dataset.bean.id + '&ghf_sj=' + event.currentTarget.dataset.bean.ghf_sj + '&ghf_email='+
        event.currentTarget.dataset.bean.ghf_email
    })

  },
  onBindFocus: function(event) {

  },
  onBindBlur: function(event) {
    console.log(this)
  },
  bindinput: function(e) {
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
  onLoad: function(options) {
    if (options.openInvoice == 'true'){
      this.setData({
        openInvoice:true
      })
    }
  },
  addOpenInvoiceInfo(e){
    let client = e.currentTarget.dataset.bean;
    var pages = getCurrentPages();
    console.log(pages)
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log(prevPage)
    prevPage.data.formdata.ghf_mc = client.ghf_mc;
    prevPage.data.formdata.ghf_nsrsbh = client.ghf_nsrsbh;
    prevPage.data.formdata.ghf_sj = client.ghf_sj;
    prevPage.data.formdata.ghf_email = client.ghf_email;
    prevPage.data.formdata.ghf_dzdh = client.ghf_dzdh;
    prevPage.data.formdata.ghf_yhzh = client.ghf_yhzh;
    prevPage.setData({
      formdata: prevPage.data.formdata
    })
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    wx.request({
      url: app.serverUrl + "/findAllCustomerInfo",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'username': app.username
      },
      method: 'POST',
      success: function(data) {
        that.setData({
          clientList: data.data.infoList
        })
      }
    })
  },
  sousuo: function (e) {
      console.log(e.detail.value)
      let that = this;
      wx.request({
        url: app.serverUrl + "/findCustomerByLikename",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'username': app.username
        },
        data:{
          customername: e.detail.value
        },
        method: 'get',
        success: function (data) {
          console.log(data.data.customerList)
          that.setData({
            clientList: data.data.customerList
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})