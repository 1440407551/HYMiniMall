import request from './network.js'
import { newBaseURL } from './config.js' // 106
import { oldBaseURL } from './config.js' // 123


export function getMultiData() {
  return request({
    url: oldBaseURL + '/home/multidata'
  })
}


export function getGoodsData(type, page) {
  return request({
    url: oldBaseURL + '/api/v2/home/data',
    data: {
      type,
      page
    }
  })
}