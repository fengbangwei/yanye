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

function showTipModal(app, url) {
  wx.getStorage({
    key: 'userInfo',
    success: function(res) {
      app.username = res.data.username;
      app.isOpenBtn = false
      if (url != '') {
        wx.navigateTo({
          url: url,
        })
      }
    },
    fail: function(res) {
      wx.showModal({
        title: '未登录',
        content: '您未登录，需要登录后才能继续',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#fd6e0e',
        confirmText: '确定',
        confirmColor: '#1e9fff',
        success: function(res) {
          wx.switchTab({
            url: '../userLogin/login'
          })
        }
      })
    },
    complete: function(res) {},
  })
}
/**
 * javascript验证纳税人识别号格式
 * @param  taxId [纳税人识别号]
 * @return true格式正确，false格式错误
 */
function checkTaxId(taxId) {
  var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
  i, j = regArr.length;
  for (var i = 0; i < j; i++) {
    if (regArr[i].test(taxId)) {
      return true;
    }
  }
  //纳税人识别号格式错误
  return false;
}
module.exports = {
  formatTime: formatTime,
  showTipModal: showTipModal,
  checkTaxId: checkTaxId
}