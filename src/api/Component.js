import request from 'superagent'
export default {

  /*检查登录*/
  async checkLogin(){
    return new Promise(function (resolve, reject) {
      request
        .get('/web/userAccount/checkLogin')
        .type('form')
        .accept('json')
        .end(function (err, res) {
          if (res.status === 200) {
            resolve({status: res.body.booleanResult});
          } else {
            resolve({status: false})
          }
        });
    });
  },

}
