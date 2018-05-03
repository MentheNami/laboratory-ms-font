import request from 'superagent'

export default {

  /* 新增配置选项 */
  async addOptionDetail(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionDetail/addOptionDetail')
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

  /* 删除单个配置选项 */
  async deleteOptionDetail(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionDetail/deleteOptionDetail')
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

  /* 修改配置选项信息 */
  async updateOptionDetail(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/configOptionDetail/updateOptionDetail')
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

  /* 通过Id获取设备详情 */
  async selectById(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionDetail/selectById')
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

  /* 根据配置组Id获取配置选项 */
  async selectByGroupId(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionDetail/selectByGroupId')
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

  /* 查询配置列表 */
  async selectConfigOptionList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionDetail/selectConfigOptionList')
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

  /* 登录之后获取所有配置 */
  async getConfigOptionList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/configOptionGroup/getConfigOptionList')
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
