import request from 'superagent'

export default {

  /*登录接口*/
  async login(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/userAccount/login')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: res.reason})
          }
        });
    });
  },

  /*退出接口*/
  async quit(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/userAccount/quit')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: res.reason})
          }
        });
    });
  },

}
