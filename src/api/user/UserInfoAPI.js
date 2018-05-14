import request from 'superagent'

export default {

  // 获取用户列表
  async getUserInfo(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/userInfo/getUserInfo')
        .type('form')
        .query(param)
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
  //删除用户
  async removeByIds(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/userInfo/removeByIds')
        .type('form')
        .query(param)
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
  async resetPassword(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/userInfo/resetPassword')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false,  reason: res.reason})
          }
        });
    });
  },

}
