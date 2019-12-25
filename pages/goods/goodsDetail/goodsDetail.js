const {
  watch,
  computed
} = require('../../../utils/vuefy.js');
Page({
  data: {
    goodsList: {
      xmmc: '',
      ggxh: '',
      dw: '',
      xmsl: '',
      xmdj: '',
      sl: '',
      xmje: 0.00
    }
  },
  onLoad: function(options) {

  },
  sure() {
    if (this.checkData()) {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.data.formdata.goodsList.push(this.data.goodsList);
      let totalHjje = (Number(prevPage.data.formdata.hjje) + Number(this.data.goodsList.xmje)).toFixed(2);
      prevPage.data.formdata.hjje = totalHjje;
      prevPage.setData({
        formdata: prevPage.data.formdata
      })
      wx.navigateBack();
    }
  },
  checkData() {
    if (this.data.goodsList.xmmc == '') {
      this.showTint("商品名称必填");
      return false;
    }
    if (this.data.goodsList.xmsl == '') {
      this.showTint("数量必填");
      return false;
    }
    if (this.data.goodsList.xmdj == '') {
      this.showTint("单价必填");
      return false;
    }
    return true;
  },
  showTint(data) {
    wx.showToast({
      title: data,
      icon: 'none',
      duration: 2000
    });
  },
  bindVal(e) {
    this.data.goodsList[e.target.dataset.name] = e.detail.value;
    if (e.target.dataset.name == 'xmdj' || e.target.dataset.name == 'xmsl') {
      this.data.goodsList[e.target.dataset.name] = this.money(e.detail.value);
      this.data.goodsList.xmje = (Number(this.data.goodsList.xmsl) * Number(this.data.goodsList.xmdj)).toFixed(2);
    }
    this.setData({
      goodsList: this.data.goodsList
    })
  },
  backLeft() {
    wx.navigateBack({
      url: '../../kpInvoice/kpInvoice'
    })
  },
  goodsCheck() {
    wx.navigateTo({
      url: '../goodsList/goodsList'
    })
  },
  /**
   * @method: 金额输入限制
   * @params: val接收number值
   */
  money(val) {
    let num = val.toString(); //先转换成字符串类型
    if (num.indexOf('.') == 0) { //第一位就是 .
      num = '0' + num
    }
    num = num.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    if (num.indexOf(".") < 0 && num != "") {
      num = parseFloat(num);
    }
    return num.toString();
  }
})