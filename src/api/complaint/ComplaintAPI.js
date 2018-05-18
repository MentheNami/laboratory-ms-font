import request from 'superagent'

export default {

  // 获取投诉列表
  async getComplaintList(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/complaint/getComplaintList')
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

  // 获取我的投诉
  async getMyComplaintList() {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/complaint/getMyComplaintList')
        .type('form')
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

  // 获取投诉详情
  async selectById(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/complaint/selectById')
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

  // 新增投诉
  async addComplaint(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/complaint/addComplaint')
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
