import request from './request'
let api = {}
api.getRecordList = function () {
  return request({
    url: '/cashbook/record/list'
  })
}
export default api
