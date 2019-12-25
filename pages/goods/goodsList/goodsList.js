const {
  pinyin
} = require('../../../utils/Convert_Pinyin.js')
const app = getApp()
Page({
  data: {
    goodsList: [],
    list: []
  },
  onLoad: function(options) {
    let _this = this;
    wx.request({
      url: app.serverUrl + '/findAllproductInfo',
      method: 'POST',
      header: {
        'username': app.username
      },
      success: res => {
        _this.data.goodsList = res.data.goodsList;
        let result = _this.data_letter_sort(_this.data.goodsList, "spell", "xmmc");
        _this.setData({
          list: result
        })
      },
      fail: res => {

      }
    })
  },
  myEventListener: function(e) {
    let goods = JSON.parse(e.detail);  
    var pages = getCurrentPages();  
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.data.goodsList.xmmc = goods.xmmc;
    prevPage.data.goodsList.ggxh = goods.ggxh;
    prevPage.data.goodsList.dw = goods.dw;
    prevPage.data.goodsList.xmdj = goods.price;
    prevPage.data.goodsList.sl = goods.sl;   //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      goodsList: prevPage.data.goodsList  
    });
    wx.navigateBack();
  },
  backLeft() {
    wx.navigateBack({
      url: '../goodsDetail/goodsDetail'
    })
  },
  selectGoods(e) {
    let data = e.target.dataset.goods;
    let goods = JSON.stringify(data)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail' + goods
    })
  },
  data_letter_sort: function(data, field, name) {
    var letter_reg = /^[A-Z]$/;
    var list = new Array();
    var letter = '';
    for (var i = 0; i < data.length; i++) {
      data[i][field] = pinyin.getFullChars(data[i][name]);
      // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
      // list['#'] = new Array();
      // 首字母 转 大写英文
      letter = (data[i][field]).substr(0, 1).toUpperCase();
      // 是否 大写 英文 字母
      // if (!letter_reg.test(letter)) {
      //   letter = '#';
      // }
      // 创建 字母 分组
      if (!(letter in list)) {
        list[letter] = new Array();
      }
      // 字母 分组 添加 数据
      list[letter].push(data[i]);
    }
    // 转换 格式 进行 排序；
    var resault = new Array();
    for (var key in list) {
      resault.push({
        alphabet: key,
        datas: list[key]
      });
    }
    resault.sort(function(x, y) {
      return x.alphabet.charCodeAt(0) - y.alphabet.charCodeAt(0);
    });
    return resault;
  }
})