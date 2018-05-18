import request from 'superagent'

export default {

  async getDeviceProgramList(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/deviceProgram/getDeviceProgramList')
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

  /* 新增设备方案 */
  async addDeviceProgram(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/deviceProgram/addDeviceProgram')
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

  /* 审批设备方案 */
  async acceptDeviceProgram(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/deviceProgram/acceptDeviceProgram')
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

  /* 通过Id获取设备方案 */
  async selectById(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/deviceProgram/selectById')
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
