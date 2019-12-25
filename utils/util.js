const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function showTipModal(app,url){
  wx.getStorage({
    key: 'userInfo',
    success: function (res) {
      app.username = res.data.username;
      app.isOpenBtn = false
      if(url != ''){
        wx.navigateTo({
          url: url,
        })
      }
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
        }
      })
    },
    complete: function (res) { },
  })
}

module.exports = {
  formatTime: formatTime,
  showTipModal: showTipModal
}
