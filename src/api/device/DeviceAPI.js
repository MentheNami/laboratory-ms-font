import request from 'superagent'

export default {

  async getDeviceList(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/device/getDeviceList')
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

  /* 新增实验室 */
  async addDevice(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/device/addDevice')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "新增实验室失败"})
          }
        });
    });
  },

  /* 批量删除实验室 */
  async removeById(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/device/removeById')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "实验室删除失败"})
          }
        });
    });
  },

  /* 修改实验室 */
  async updateDevice(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/device/updateDevice')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "新增实验室失败"})
          }
        });
    });
  },

  /* 实验室名是否唯一 */
  // async isUniqueByName(param){
  //   return new Promise(function (resolve, reject) {
  //     request
  //       .get('/web/laboratory/isUniqueByName')
  //       .type('form')
  //       .query(param)
  //       .accept('json')
  //       .end(function (err, res) {
  //         if (res.status === 200) {
  //           resolve(res.body)
  //         } else {
  //           resolve({status: false, reason: "实验室名验证失败，请联系管理员"})
  //         }
  //       });
  //   });
  // },

  /* 通过Id获取实验室详情 */
  async selectById(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/device/selectById')
        .type('form')
        .query(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "实验室详情获取失败"})
          }
        });
    });
  },

  async removeByIds(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/device/removeByIds')
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

}
