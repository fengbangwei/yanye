//app.js
App({
  appid:"wx8793e8ab1a85f13c",
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
  },
  globalData: {
    userInfo: null
  }
})