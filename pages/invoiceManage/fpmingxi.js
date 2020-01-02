// pages/clientManage/addClient/addClient.js
var QRCode = require('../../utils/qrcode.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tableList:{
      ghf_mc: "",
      hjje: "",
      xsf_dzdh: "",
      xsf_mc: "",
      erweima: "",
      hjse: "",
      jshj: "",
      fpdm: "",
      fphm: ""
    }
    
  },
  backLeft: function () {
    wx.navigateBack({
      url: '../invoiceManage/invoiceManage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(decodeURIComponent(options.erweima))
    new QRCode('myQrcode', {
      //text: decodeURIComponent(options.erweima),
      text: decodeURIComponent(options.erweima),
      width: 200,
      height: 200,
      padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
      callback: (res) => {
       
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
    })
    console.log(options)
    this.data.tableList.ghf_mc = options.ghf_mc
    this.data.tableList.hjje = options.hjje
    this.data.tableList.xsf_dzdh = options.xsf_dzdh
    this.data.tableList.xsf_mc = options.xsf_mc
    this.data.tableList.erweima = options.erweima
    this.data.tableList.hjse = options.hjse
    this.data.tableList.jshj = options.jshj
    this.data.tableList.fpdm = options.fpdm
    this.data.tableList.fphm = options.fphm
    this.setData({
      tableList: options
    })
  },
  //点击开始的时间  
  timestart: function (e) {
    var _this = this;
    _this.setData({ timestart: e.timeStamp });
  },
  //点击结束的时间
  timeend: function (e) {
    var _this = this;
    _this.setData({ timeend: e.timeStamp });
  },

  //保存图片
  /*saveImg: function (e) {
    var _this = this;
    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      console.log("长按");
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功");
              var imgUrl = "http://shareds.oss-cn-hangzhou.aliyuncs.com/exhibit/20180815/tmp_35d425e6e732ba516f2e8c9988706eba.jpg";
              wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }**/
})