const { pinyin } = require('../../../utils/Convert_Pinyin.js')
Page({
  data: {
    goodsList: [
      {
        "id": 344,
        "xmmc": "会员服务费",
        "ggxh": '',
        "sl": 0.00,
        "dw": ''
      }, {
        "id": 344,
        "xmmc": "李子",
        "ggxh": '',
        "sl": 0.09,
        "dw": ''
      }, {
        "id": 344,
        "xmmc": "狮子",
        "ggxh": '',
        "sl": 0.09,
        "dw": ''
      }, {
        "id": 344,
        "xmmc": "狮子",
        "ggxh": '',
        "sl": 0.09,
        "dw": ''
      }
    ]
  },
  onLoad: function (options) {
    let result = this.data_letter_sort(this.data.goodsList,"spell","xmmc");
    console.log(result)
    
  },
  data_letter_sort: function (data, field, name) {
    var letter_reg = /^[A-Z]$/;
    var list = new Array();
    var letter = '';
    for (var i = 0; i < data.length; i++) {
      data[i][field] = pinyin.getFullChars(data[i][name]);
      // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
      list['#'] = new Array();
      // 首字母 转 大写英文
      letter = (data[i][field]).substr(0, 1).toUpperCase();
      // 是否 大写 英文 字母
      if (!letter_reg.test(letter)) {
        letter = '#';
      }
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
        letter: key,
        list: list[key]
      });
    }
    resault.sort(function (x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    // # 号分组 放最后
    var last_arr = resault[0];
    resault.splice(0, 1);
    resault.push(last_arr);
    // 转换 数据 格式
    var json_sort = {}
    for (var i = 0; i < resault.length; i++) {
      json_sort[resault[i].letter] = resault[i].list;
    }
    return json_sort;
  }
})