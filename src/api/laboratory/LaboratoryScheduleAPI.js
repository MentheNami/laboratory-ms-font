import request from 'superagent'

export default {

  /* 新增实验室申请 */
  async addLaboratorySchedule(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/laboratorySchedule/addLaboratorySchedule')
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

  /* 审批实验室预定 */
  async updateLaboratory(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/laboratorySchedule/acceptById')
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

  // 获取实验室预定记录
  async getLaboratoryScheduleList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/laboratorySchedule/getLaboratoryScheduleList')
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
