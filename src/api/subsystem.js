import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/subsystem/list',
    method: 'get',
    params
  })
}
