import request from 'superagent'
export default {

  /* 获取身份列表 */
  async getProvinceList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/province/getProvinceList')
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

  /* 获取大学列表 */
  async getUniversityList(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/university/getUniversityList')
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
