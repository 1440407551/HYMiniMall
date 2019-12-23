import request from './network.js'
import { newBaseURL } from './config.js' // 106
import { oldBaseURL } from './config.js' // 123

export function getCategory() {
  return request({
    url: oldBaseURL + '/api/v2/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: oldBaseURL + '/api/v2/subcategory',
    data: {
      maitKey
    }
  })
}


export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: oldBaseURL + '/api/v2/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}