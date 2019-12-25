const app = getApp()

Page({
  data: {
    isOpenBtn:true
  },
  onLoad: function (params) {
    // debugger;
  },

  // 登录  
  doLogin: function (e) {
    console.log(e)
    var me = this;
    let that = this;
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;
    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待...',
      });
      // 调用后端
      wx.request({
        url: serverUrl + '/login',
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          let result = res.data;
          if (res.data.returncode == "0000") {
           // debugger
            // 登录成功跳转 
            wx.hideLoading();
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function(res) {
                let _this = that;
                app.username = result.data.username;//设置全局的登录名
                wx.setStorage({
                  key: 'userInfo',
                  data: result.data,
                  success: function (res) {
                    // 页面跳转
                    wx.switchTab({
                      url: '../index/index'
                    })
                    _this.setData({
                      isOpenBtn: false
                    })
                  }
                })
                
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          } else if (res.data.returncode == "1111") {
            // 失败弹出框
            wx.showToast({
              title: res.data.returnmsg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },
  goRegistPage:function() {
    wx.redirectTo({
      url: '../userRegist/regist',
    })
  },
  exit(){
    wx.clearStorage()
    this.setData({
      isOpenBtn: true
    })
    wx.showToast({
      title: '注销成功',
      icon: 'none',
      duration: 3000
    })
    wx.switchTab({
      url: '../index/index'
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {

      },
      fail: function (res) {
        wx.showModal({
          title: '未登录',
          content: '您未登录，需要登录后才能继续',
          showCancel: false,
          cancelText: '取消',
          cancelColor: '#fd6e0e',
          confirmText: '确定',
          confirmColor: '#1e9fff',
          success: function (res) {
            wx.switchTab({
              url: '../userLogin/login'
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) { },
    })
  }
})