import request from 'superagent'

export default {


  /* 修改编号规则 */
  async updateNumberRule(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/numberRule/updateNumberRule')
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

  /* 获取单个编号规则 */
  async selectById(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/numberRule/selectById')
        .type('form')
        .query(param)
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

  /* 获取所有编号规则 */
  async getNumberRule(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/numberRule/getNumberRule')
        .type('form')
        .query(param)
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

