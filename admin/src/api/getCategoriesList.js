import request from './index'

export default function getCategoriesList(data) {
  return request({
    url: '/rest/categories',
    method: 'post',
    data
  })
}