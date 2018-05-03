import request from 'superagent'

export default {

  /* 新增配置组 */
  async addConfigGroup(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionGroup/addConfigGroup')
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

  /* 删除配置组 */
  async deleteById(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionGroup/deleteById')
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

  /* 修改配置组 */
  async updateConfigGroup(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionGroup/updateConfigGroup')
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

  /* 获取单个配置组 */
  async getDetailById(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionGroup/getDetailById')
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

  /* 获取所有配置组 */
  async getConfigGroupList(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionGroup/getConfigGroupList')
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

