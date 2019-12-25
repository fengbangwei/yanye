// pages/invoiceManage/invoiceManage.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp()
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

    tableList: {
      "xsf_mc": "",
      "hjje": "",
      "date": "",
      "work": "手工开票",
      "msg": "",
      "state":""
    }
  },
  
  backLeft: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  mingxi: function (event) {
    
    var url = event.currentTarget.dataset.bean.pdf_url;
    console.log(encodeURIComponent(url))
    wx.navigateTo({
      url: '../invoiceManage/fpmingxi?ghf_mc=' + event.currentTarget.dataset.bean.ghf_mc + '&hjje=' + event.currentTarget.dataset.bean.hjje + '&xsf_dzdh=' + event.currentTarget.dataset.bean.xsf_dzdh + '&xsf_mc=' + event.currentTarget.dataset.bean.xsf_mc + '&hjse=' + event.currentTarget.dataset.bean.hjse + '&jshj=' + event.currentTarget.dataset.bean.hjbhsje + '&fpdm=' + event.currentTarget.dataset.bean.fpdm + '&fphm=' + event.currentTarget.dataset.bean.fphm + '&erweima=' + encodeURIComponent(url) +'',
    })
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
    let that = this;
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/findByLikeghfname?ghfmc=&date=" + e.detail.value + "",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'username': app.username
      },
      method: 'GET',
      success: function (data) {
        console.log(data)
        let _data = data.data;

        for (var i = 0; i < _data.length; i++) {
          console.log(that.data.tableList.date)
          var oldDate = data.data[i].date
          data.data[i].date = new Date(oldDate).getHours()
            + ":" + new Date(oldDate).getMinutes()
            + ":" + new Date(oldDate).getSeconds()
        }

        that.setData({
          tableList: data.data
        })
      }

    })
  },
  sousuo: function (e) {
    let that = this;   
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/findByLikeghfname?ghfmc=" + e.detail.value + "&date=" + that.data.date+"",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'username': app.username
      },
      method: 'get',
      success: function (data) {
        let _data = data.data;

        for (var i = 0; i < _data.length; i++) {
          var oldDate = data.data[i].date
          data.data[i].date = new Date(oldDate).getHours()
            + ":" + new Date(oldDate).getMinutes()
            + ":" + new Date(oldDate).getSeconds()
        }

        that.setData({
          tableList: data.data
        })

      }
    })
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
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var time = this.data.date
    time = year + "-" + month + "-" + day
    this.setData({
      date: time
    })
    let that = this;
    wx.request({
      url: "https://www.gzdzfpy.com.cn/yanyeSystem/findByLikeghfname?ghfmc=&date="+time+"",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'username': app.username
      },
      method: 'GET',
      success: function (data) {
        let _data = data.data;
        
        for (var i = 0; i < _data.length;i++){
          console.log(that.data.tableList.date)
          var oldDate = data.data[i].date
          data.data[i].date = new Date(oldDate).getHours()
            + ":" + new Date(oldDate).getMinutes()
            + ":" + new Date(oldDate).getSeconds()
        }
        
        that.setData({
          tableList: data.data
        })
        
      }
    })
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
  }
})