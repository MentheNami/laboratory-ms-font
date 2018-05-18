import request from 'superagent'

export default {


  // 重置密码
  async resetPassword(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/userAccount/resetPassword')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: res.status, reason: res.reason})
          }
        });
    });
  },

}
