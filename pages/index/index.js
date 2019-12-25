//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  clientManage: function() {
    let url = '../clientManage/clientManage';
    util.showTipModal(app, url);
  },
  kpInvoice: function(){
    let url = '../kpInvoice/kpInvoice';
    util.showTipModal(app, url);
  },
  zengzhishui: function(){
    let url = '../invoiceManage/invoiceManage';
    util.showTipModal(app, url);
  },
  onLoad: function () {
    util.showTipModal(app,'');
  }
})
