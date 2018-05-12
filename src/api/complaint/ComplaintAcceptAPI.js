import request from 'superagent'

export default {

  async handlingComplaint(param) {
    return new Promise(function (resolve, reject) {
      request
        .post('/web/complaintAccept/handlingComplaint')
        .type('form')
        .send(param)
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
