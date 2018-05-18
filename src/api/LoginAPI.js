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
  async quit(){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/userAccount/quit')
        .type('form')
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

  /* 获取验证码 */
  async getCode(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/code/getCode')
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

  /* 注册 */
  async addUserAccount(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/userAccount/addUserAccount')
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
