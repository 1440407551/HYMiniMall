import request from './network.js'
import { newBaseURL } from './config.js' // 106
import { oldBaseURL } from './config.js' // 123


export function getMultiData() {
  return request({
    url: oldBaseURL + '/home/multidata'
  })
}