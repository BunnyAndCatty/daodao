import request from './request'
let api = {}
api.getTags = function () {
  return request({
    url: '/daodao/bill/recordTag'
  })
}
export default api
