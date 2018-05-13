import request from 'superagent'

export default {

  async getAttachedFileList(param) {
    return new Promise(function (resolve, reject) {
      request
        .get('/web/attachedFile/getAttachedFileList')
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

  async downloadFile(param){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/attachedFile/downloadFile')
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
