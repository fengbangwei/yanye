// pages/kpInvoice/kpInvoice.js
const app = getApp();
const {
  watch,
  computed
} = require('../../utils/vuefy.js');
let timer;
let lastTime;
Page({
  data: {
    formdata: {
      ghf_mc: '', //购方名称
      ghf_nsrsbh: '', //购方税号
      ghf_dzdh: '', //地址电话
      ghf_yhzh: '', //银行账号,
      ghf_sj: '', //手机
      ghf_email: '', //邮箱
      bz: '', //备注
      hjje: '0.00', //金额
      goodsList: []
    },
    isShowMore: true,
    selectDataForm: true,
    secondSetp: false,
    isFalseMore: true,
    companyList: [],
    isSearch: false,
    isSure: false
  },
  onLoad: function(options) {
  },
  backLeft: function() {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  switchTab: function(e) {
    let tabName = e.currentTarget.dataset.tab;
    if (tabName === "company") {
      this.data.selectDataForm = true;
    } else {
      this.data.selectDataForm = false;
    }
    this.setData({
      selectDataForm: this.data.selectDataForm,
      secondSetp: false,
      isSure: false
    })
    this.data.formdata = {
      ghf_mc: '', //购方名称
      ghf_nsrsbh: '', //购方税号
      ghf_dzdh: '', //地址电话
      ghf_yhzh: '', //银行账号,
      ghf_sj: '', //手机
      ghf_email: '', //邮箱
      bz: '', //备注
      hjje: '0.00', //金额
      goodsList: []
    }
    this.setData({
      formdata: this.data.formdata
    })
  },
  openInvoice: function(e) {
    let that = this;
    let data = {
      data: this.data.formdata
    }
    wx.showLoading({
      title: '申请开票中',
      mask: true
    })
    wx.request({
      url: app.serverUrl + '/getInvoiceData/open',
      data: data,
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'username': app.username
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        if (res.data.result == 'WAIT' || res.data.result == 'SUCCESS') {
          wx.showToast({
            title: '申请开票成功',
            icon: 'success',
            duration: 2000,
            success: function(res) {
              that.data.formdata = {
                ghf_mc: '', //购方名称
                ghf_nsrsbh: '', //购方税号
                ghf_dzdh: '', //地址电话
                ghf_yhzh: '', //银行账号,
                ghf_sj: '', //手机
                ghf_email: '', //邮箱
                bz: '', //备注
                hjje: '0.00', //金额
                goodsList: []
              }
              that.setData({
                isSure: false,
                secondSetp: false,
                formdata: that.data.formdata
              })
            }
          });
          wx.hideLoading();
        } else {
          wx.showToast({
            title: '申请开票失败',
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '../kpInvoice/kpErrorInfo/kpErrorInfo?message=' + res.data.msg,
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '申请开票失败',
          icon: 'none',
          duration: 2000,
          success: function(res) {
            wx.navigateTo({
              url: '../kpInvoice/kpErrorInfo/kpErrorInfo?message=系统错误',
            })
          }
        })
      }
    })
  },
  switchOnOff() {
    this.setData({
      secondSetp: true
    })
    if (this.data.selectDataForm) {
      this.setData({
        isShowMore: true
      })
    } else {
      this.setData({
        isShowMore: false
      })
    }
  },
  firstSetp() {
    this.setData({
      secondSetp: false,
      isSure: false
    })
  },
  nextSetp() {
    if (this.checkData()) {
      this.switchOnOff();
      this.setData({
        isSure: true
      })
    }
  },
  checkData() {
    const phone = /(^$)|^1\d{10}$/;
    const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    const reg = /^[0-9a-zA-Z]+$/;
    if (this.data.formdata.ghf_mc == '') {
      this.showTint('发票抬头必填');
      return false;
    }
    if (this.data.selectDataForm) {
      if (this.data.formdata.ghf_nsrsbh == '') {
        this.showTint('纳税人识别号必填');
        return false;
      }
    }
    if (!phone.test(this.data.formdata.ghf_sj) || this.data.formdata.ghf_sj == '') {
      this.showTint('手机号码未正确填写');
      return false;
    }
    if (this.data.formdata.ghf_email == '') {
      this.showTint('邮箱必填');
      return false;
    }
    if (!mailReg.test(this.data.formdata.ghf_email) && this.data.formdata.ghf_email != '') {
      this.showTint('邮箱格式错误');
      return false;
    }
    if (this.data.formdata.goodsList.length == 0) {
      this.showTint('请添加商品明细');
      return false;
    }
    if (Number(this.data.formdata.hjje) < 0) {
      this.showTint('金额错误');
      return false;
    }
    return true
  },
  showTint(data) {
    wx.showToast({
      title: data,
      icon: 'none',
      duration: 2000
    });
  },
  openMore: function() {
    this.setData({
      isShowMore: !this.data.isShowMore
    })
  },
  bindVal(e) {
    this.data.formdata[e.target.dataset.name] = e.detail.value;
    let key = e.target.dataset.name;
    this.setData({
      formdata: this.data.formdata
    })
    if (key == 'ghf_mc' && this.data.selectDataForm) {
      this.setData({
        isSearch: true
      })
      this.getNameAndTaxNo(e.detail.value)
    }
  },
  getNameAndTaxNo(value) {
    if (value != '') {
      let name = {
        name: value
      };
      let that = this;
      let now = new Date();
      if (lastTime && lastTime - now < 2000) {
        clearTimeout(timer)
      }
      timer = setTimeout(function() {
        wx.request({
          url: app.serverUrl + '/querytaxnoAndname',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          data: name,
          success: res => {
            let data = res.data.data;
            if (Object.keys(data).length != 0) {
              data = data.slice(0, 8);
              that.setData({
                companyList: data
              })
            }
          },
          fail: res => {

          }
        })
        lastTime = +new Date()
      }, 500)
    } else {
      this.setData({
        companyList: []
      })
    }

  },
  selectCompanyInfo(e) {
    let client = e.currentTarget.dataset.company;
    this.data.formdata.ghf_mc = client.name;
    this.data.formdata.ghf_nsrsbh = client.creditCode;
    this.data.formdata.ghf_dzdh = client.address + ' ' + client.tel;
    this.setData({
      isSearch: false,
      formdata: this.data.formdata
    })
  },
  addCommodity() {
    wx.navigateTo({
      url: '../goods/goodsDetail/goodsDetail'
    })
  },
  removeCommodity() {
    var goodList = this.data.formdata.goodsList;
    if (goodList.length > 0) {
      let endGood = goodList[goodList.length - 1];
      let totalHjje = (Number(this.data.formdata.hjje) - (Number(endGood.xmje))).toFixed(2);
      this.data.formdata.hjje = totalHjje;
      this.data.formdata.goodsList.pop();
      this.setData({
        formdata: this.data.formdata
      })
    }
  },
  selectClient() {
    wx.navigateTo({
      url: '../clientManage/clientManage?openInvoice=true',
    })
  }
})