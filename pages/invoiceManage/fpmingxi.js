// pages/clientManage/addClient/addClient.js
import QRCode from '../../utils/qrcode.js';
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
  }
})