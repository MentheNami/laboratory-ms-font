import request from 'superagent'

export default {

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

  /* 新增实验室 */
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
            resolve({status: false, reason: "投诉失败"})
          }
        });
    });
  },

  /* 批量删除实验室 */
  async removeById(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/compliant/removeById')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "投诉删除失败"})
          }
        });
    });
  },

  /* 修改实验室 */
  async updateComplaint(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/compliant/updateComplaint')
        .type('form')
        .send(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "更新失败"})
          }
        });
    });
  },

  /* 通过Id获取实验室详情 */
  async selectById(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/compliant/selectById')
        .type('form')
        .query(param)
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve(res.body)
          } else {
            resolve({status: false, reason: "投诉详情获取失败"})
          }
        });
    });
  },


}
