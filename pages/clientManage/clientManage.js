// pages/clientManage/clientManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowButton:false,
    clientList:[
      {
        "ghf_mc":"贵州天香湖酒业有限公司",
        "ghf_nsrsbh":"91520382MA6HTNDK0F",
        "ghf_sj":"18186442403",
        "ghf_email":"2711200265",
        "ghf_dzdh":"贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh":"中国建设银行贵阳市京瑞支行52001433600052506980"
      },
      {
        "ghf_mc": "贵州航天金穗科技有限公司",
        "ghf_nsrsbh": "9152010371431591XR",
        "ghf_sj": "18186442403",
        "ghf_email": "2711200265",
        "ghf_dzdh": "贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh": "中国建设银行贵阳市京瑞支行52001433600052506980"
      },
      {
        "ghf_mc": "广州王老吉大健康产业有限公司",
        "ghf_nsrsbh": "914401015915128836",
        "ghf_sj": "18186442403",
        "ghf_email": "2711200265",
        "ghf_dzdh": "贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh": "中国建设银行贵阳市京瑞支行52001433600052506980"
      },
      {
        "ghf_mc": "贵州天香湖酒业有限公司",
        "ghf_nsrsbh": "91520382MA6HTNDK0F",
        "ghf_sj": "18186442403",
        "ghf_email": "2711200265",
        "ghf_dzdh": "贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh": "中国建设银行贵阳市京瑞支行52001433600052506980"
      },
      {
        "ghf_mc": "贵州航天金穗科技有限公司",
        "ghf_nsrsbh": "9152010371431591XR",
        "ghf_sj": "18186442403",
        "ghf_email": "2711200265",
        "ghf_dzdh": "贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh": "中国建设银行贵阳市京瑞支行52001433600052506980"
      },
      {
        "ghf_mc": "广州王老吉大健康产业有限公司",
        "ghf_nsrsbh": "914401015915128836",
        "ghf_sj": "18186442403",
        "ghf_email": "2711200265",
        "ghf_dzdh": "贵阳市延安东路3号智诚大厦A座20楼400-85190900851-28611836",
        "ghf_yhzh": "中国建设银行贵阳市京瑞支行52001433600052506980"
      }
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