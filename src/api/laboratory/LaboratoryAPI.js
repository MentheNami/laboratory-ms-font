import request from 'superagent'

export default {

  /* 新增实验室 */
  async addLaboratory(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/laboratory/addLaboratory')
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
        .post('/web/laboratory/removeById')
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
  async updateLaboratory(param){
    return new Promise(function (resolve, reject) {
      request
        .post('/web/laboratory/updateLaboratory')
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
        .get('/web/laboratory/selectById')
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

  /* 获取实验室列表 */
  async getLaboratoryList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/laboratory/getLaboratoryList')
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
