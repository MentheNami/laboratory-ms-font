import request from 'superagent'

export default {

  async getLaboratoryList(param) {
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
            resolve({status: false, reason: res.reason})
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
            resolve({status: false, reason: res.reason})
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


  /* 获取个人账户基本信息 */
  async getSelfInfo(){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/userInfo/getSelfInfo')
        .type('form')
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
        .get('/web/laboratory/removeByIds')
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
  async updateLaboratory(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/laboratory/updateLaboratory')
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
            resolve({status: res.status, reason: res.reason})
          }
        });
    });
  },
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
