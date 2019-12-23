//app.js
App({
  appid:"wx8793e8ab1a85f13c",
  secret:"e66f44d3023fb4d821a99de3c0fc72b7",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
            if (res.code) {
              //获取openId
              var that = getApp();
              let data = {
                code:res.code
              };
              var getOpenIdUrl = "https://www.gzhtjs.com.cn/WeChat/getopenid";
              console.log(getOpenIdUrl)
              wx.request({
                url: getOpenIdUrl,
                data:data,
                method: 'GET',
                header: { 'content-type': 'application/x-www-form-urlencoded:charset:utf-8'},
                success: function (openIdRes) {
                  console.info("获取用户openId成功");
                  console.log(openIdRes)
                },
                fail: function (error) {
                  console.log(error)
                },
                complete: function (openIdRes) {
                }
              })
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
  }
})