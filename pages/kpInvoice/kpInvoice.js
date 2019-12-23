// pages/kpInvoice/kpInvoice.js
const { watch, computed } = require('../../utils/vuefy.js');
Page({
  data: {
    formdata :{
      ghf_mc: '',  //购方名称
      ghf_nsrsbh: '', //购方税号
      ghf_dzdh: '',  //地址电话
      ghf_yhzh: '',//银行账号,
      ghf_sj: '',//手机
      ghf_email: '',//邮箱
      bz: '',//备注
      hjje: '',//金额
      goodsList: []
    },
      isShowMore:true,
      selectDataForm:true,
      secondSetp:false,
      isFalseMore: true,
      companyList:[]
  },
  onLoad: function (options) {
    computed(this, {
      totalMoney: function () {
        return '0.00';
      }
    });
    // watch(this, {
    //   ghf_mc(newVal) {
    //     console.log(newVal)
    //     // this.setData({ghf_mc: newVal+ '11111111' })
    //   }
    // })
  },
  backLeft: function(){
    wx.navigateBack({
      url:'../index/index'
    })
  },
  switchTab:function(e){
    let tabName = e.currentTarget.dataset.tab;
    if(tabName === "company"){
      this.data.selectDataForm = true;
    } else {
      this.data.selectDataForm = false;
    }
    this.setData({
      selectDataForm: this.data.selectDataForm
    })
  },
  openInvoice: function(e){
    console.log(e)
    this.checkData()
  },
  checkData(){
    const phone = /(^$)|^1\d{10}$/;
    const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    const reg = /^[0-9a-zA-Z]+$/;
    this.data.formdata.hjje = this.data.totalMoney;
    if (this.data.formdata.ghf_mc == '') {
      this.showTint('发票抬头必填');
      return false;
    }
    if (this.data.formdata.ghf_nsrsbh == '') {
      this.showTint('纳税人识别号必填');
      return false;
    }
    if (!phone.test(this.data.formdata.ghf_sj) || this.data.formdata.ghf_sj == '') {
      this.showTint('手机号码未正确填写');
      return false;
    }
    if (!mailReg.test(this.data.formdata.ghf_email) && this.data.formdata.ghf_email != '') {
      this.showTint('邮箱格式错误');
      return false;
    }
    // if (this.data.formdata.hjje == 0) {
    //   this.showTint('请添加商品明细');
    //   return false;
    // }
    // if (this.data.formdata.hjje < 0) {
    //   this.showTint('金额错误');
    //   return false;
    // }
    return true
  },
  showTint(data) {
    wx.showToast({
      title: data,
      icon: 'none',
      duration: 2000
    });
  },
  openMore:function(){
    this.setData({
      isShowMore: !this.data.isShowMore
    })
  },
  bindVal(e){
    console.log(e)
    this.data.formdata[e.target.dataset.name] = e.detail.value;
    console.log(this.data.formdata)
    let key = e.target.dataset.name;
    this.setData({
      key: e.detail.value
    }) 
    console.log(e.detail.value)
  }
})