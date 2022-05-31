import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/roles/list',
    method: 'get',
    params
  })
}
