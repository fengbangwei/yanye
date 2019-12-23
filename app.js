//app.js
App({
  appid:"wxa1b422765bb79b9a",
  secret:"e66f44d3023fb4d821a99de3c0fc72b7",
  serverUrl:"https://www.gzhtjs.com.cn/yanyeSystem",
  openid:"",
  username:"",
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //获取openId
              var that = getApp();
              var getOpenIdUrl = this.serverUrl +"/wechat/userInfo";
              var data = {code:res.code}
              // wx.request({
              //   url: getOpenIdUrl,
              //   method:'GET',
              //   data:data,
              //   header: { 'content-type': 'application/application/x-www-form-urlencoded;charset=UTF-8' },
              //   success: function (openIdRes) {
              //     console.info("获取用户openId成功");
              //     if (openIdRes.data.success){
              //       console.log(openIdRes.data.result.openid)
              //       that.openid = openIdRes.data.result.openid;
              //       let param = {
              //         openId: openIdRes.data.result.openid
              //       }
              //       console.log(param)
              //       wx.request({
              //         url: that.serverUrl+'/loginByOpenid',
              //         method: 'GET',
              //         data: param,
              //         header: { 'content-type': 'application/application/x-www-form-urlencoded;charset=UTF-8' },
              //         success: function (res) {
              //           console.info("获取用户信息成功");
              //           console.info(res);
              //           that.username = res.data.data.username;
              //           console.log(that.username)
              //         },
              //         fail: function (error) {
              //           console.log(error)
              //         },
              //         complete: function (openIdRes) {
              //         }
              //       })
              //     }
              //   },
              //   fail: function (error) {
              //     console.log(error)
              //   },
              //   complete: function (openIdRes) {
              //   }
              // })
            }
          }
        })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  }
})