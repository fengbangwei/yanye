// pages/invoiceManage/invoiceManage.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2019-10-01",
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,

    tableList: [{
      "pluname": "",
      "xscount": 1,
      "date": "今天",
      "datetime": "9:25:31",
      "work": "扫码开票",
      "zt": "未扫码"
    },
    {
      "pluname": "航天信息股份有限公司",
      "xscount": 1,
      "date": "今天",
      "datetime": "9:26:28",
      "work": "手工开票",
      "zt": "开票中"
    },
    {
      "pluname": "航天信息股份有限公司",
      "xscount": 1,
      "date": "今天",
      "datetime": "10:26:32",
      "work": "手工开票",
      "zt": "开票中"
    },
    {
      "pluname": "航天信息股份有限公司",
      "xscount": 1,
      "date": "今天",
      "datetime": "10:46:22",
      "work": "手工开票",
      "zt": "开票中"
    },
    {
      "pluname": "",
      "xscount": 1,
      "date": "今天",
      "datetime": "11:01:54",
      "work": "扫码开票",
      "zt": "未扫码"
    },
    {
      "pluname": "航天信息股份有限公司",
      "xscount": 1,
      "date": "昨天",
      "datetime": "11:26:45",
      "work": "手工开票",
      "zt": "开票中"
    },
    {
      "pluname": "",
      "xscount": -1,
      "date": "昨天",
      "datetime": "11:44:38",
      "work": "扫码开票",
      "zt": "未扫码"
    }
    ]
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var time = this.data.date
    time=year+"-"+month+"-"+day
    this.setData({
      date:time
    })

    /*wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/findByLikeghfname?ghfmc=&date=2019-11-07",
      headers: {
        'content-type': 'application/x-www-form-urlencoded', 
        'username': 'admin'
      },
      method: 'GET',
      success: function (data) {
        console.log(data)
      }

    }) */

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
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